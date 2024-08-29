// sinh vien co ban can co : mssc,tenSinhVien,ngaySinh , email, matKhau, diemToan , diemLy, diemHoa
// dùng as khi trùng tên

import { SinhVien } from "./../models/SinhVien.js";
import {
  checkEmailValue,
  checkEmptyValue,
  checkMinMaxValue,
  checkNumberValue,
  checkPassValue,
  checkStringValue,
} from "../validation/validation.js";
import { removeVietnameseTones } from "./util/util.js";

// import hoTenA from './../models/SinhVien.js';

// console.log(hoTenA)

// const sinhVien = new SinhVien2(
//   "SE183939",
//   "Nguyễn Hưng Phú",
//   "phunhse183939@fpt.edu.vn",
//   "9840497phu",
//   "15/01/2004",
//   "Khóa 1",
//   8,
//   9,
//   10
// );
// // sinhVien.tenSinhVien = "Nguyễn Hưng Phú";

// console.log(sinhVien);
// sinhVien.tinhDiemTrungBinh() ;

// các chức năng sẽ làm trong bài tập : Thêm sinh viên, reset dữ liệu, cập nhật sinh viên, tìm kiếm sinh viên, hiển thị thông tin sinh viên lên giao diện, xóa sinh viên, lưu trữ sinh viên xuống localstorage, lấy dữ liệu sinh viên đưa lên input để cập nhật, valication dữ liệu đầu vào
// B1 tạo 1 sự kiện obsubmit cho form để lấy dữ liệu
// B2 lấy dữ liệu từ input người dùng

//----------chức năng thêm sinh viên--------------

//------- chức năng lấy thông tin từ người dùng
function getInfoSinhVienForm() {
  let arrField = document.querySelectorAll("form input, form select");

  const sinhVien = new SinhVien();

  // dùng vòng lặp để duyệt qua mảng và gọi tới các phần tử DOM
  let checkActive = true;
  for (let field of arrField) {
    let { id, value } = field;
    sinhVien[id] = value;

    //các bước chuẩn bị các dữ liệu để kiểm tra
    let theThongBao = field.parentElement.querySelector("span");
    // bước kiểm tra dữ liểu để chặn validation

    let checkRong = checkEmptyValue(value, theThongBao);
    checkActive &= checkRong;
    if (checkRong) {
      let dataType = field.getAttribute("data-type");
      if (dataType == "email") {
        checkActive &= checkEmailValue(value, theThongBao);
      } else if (dataType == "pass"){
        
       checkActive &= checkPassValue(value, theThongBao) && checkMinMaxValue(value, theThongBao, 4 , 8);
        
      }else if (dataType == "string"){
        checkActive &= checkStringValue(value, theThongBao);
        
      }else if (dataType == "number") {
        checkActive &= checkNumberValue(value, theThongBao)
      }
    }

    
    
  }

  return checkActive ? sinhVien : null;
}









let arrSinhVien = [];
// chức năng sự kiện onsubmit cần có 1 thẻ form

document.getElementById("formQLSV").onsubmit = function (event) {
  // ngăn chặn quá trình load lại trang của submit
  event.preventDefault();

  let sinhVien = getInfoSinhVienForm();
  if (!sinhVien) {
    return;
  }

  arrSinhVien.push(sinhVien);
  renderDataSinhVien();
  event.target.reset();
  setLocalStorage("arrUser", arrSinhVien);
};

function renderDataSinhVien(arr = arrSinhVien) {
  let content = "";
  for (let sinhVien of arr) {
    // khởi tạo ra một đối tượng mới từ lớp đối tượng sinh vien
    // sử dụng cho dữ liệu giữa các đối tượng
    let newSinhVien = new SinhVien();
    Object.assign(newSinhVien, sinhVien);
    const { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSV } = newSinhVien;
    content += `
    <tr>
      <td>${txtMaSV}</td>
      <td>${txtTenSV}</td>
      <td>${txtEmail}</td>
      <td>${txtNgaySinh}</td>
      <td>${khSV}</td>
      <td>${newSinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
      <td>
        <button onclick="deleteUser('${txtMaSV}')" class="btn btn-danger">Xóa</button>
        <button onclick="getInfoSinhVien('${txtMaSV}')"class="btn btn-warning">Sửa</button>
      </td>
    </tr>  
    `;
  }
  document.getElementById("tbodySinhVien").innerHTML = content;
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}

function setLocalStorage(key, value) {
  // chuyển đổi dữ liệu thành chuỗi json
  let jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
}

function deleteUser(mssv) {
  console.log(mssv);
  let index = arrSinhVien.findIndex((item, index) => item.txtMaSV == mssv);
  if (index != -1) {
    arrSinhVien.splice(index, 1);

    renderDataSinhVien();
    setLocalStorage("arrUser", arrSinhVien);
  }
}

window.deleteUser = deleteUser;
window.getInfoSinhVien = getInfoSinhVien;
window.onload = function () {
  let dataArrUserLocal = getLocalStorage("arrUser");
  if (dataArrUserLocal) {
    arrSinhVien = dataArrUserLocal;
    renderDataSinhVien();
  }
};
// tìm kiếm và lấy ra thành phần mình muốn chạy for of tìm cái giống để so sánh
function getInfoSinhVien(mssv) {
  let arrField = document.querySelectorAll("form input, form select");
  let sinhVienCanKiem;

  for (let sinhVien of arrSinhVien) {
    if (sinhVien.txtMaSV == mssv) {
      sinhVienCanKiem = sinhVien;
    }
  }
  for (let field of arrField) {
    let { id } = field;
    field.value = sinhVienCanKiem[id];
  }
  //ngăn chặn input

  document.getElementById("txtMaSV").readOnly = true; // hoặc dùng disabled để block input này
}
// tạo sự kiện click cho nút button cập nhật
// thực hiện lấy dữ liệu từ form

document.querySelector(".btn-info").onclick = function () {
  // let sinhVien = getInfoSinhVienForm();
  // tìm kiếm vị trí index của ptu cần thay thế trong mảng
  // thay thế dữ liệu mới vào vị trí index
  // cập nhật xong chạy lại render và lưu dữ liệu đến local
  // clear form
  let sinhVien = getInfoSinhVienForm();
  let index = arrSinhVien.findIndex(
    (item, index) => sinhVien.txtMaSV == item.txtMaSV
  );
  if (index != -1) {
    arrSinhVien[index] = sinhVien;
    renderDataSinhVien();
    setLocalStorage("arrUser", arrSinhVien);
    document.querySelector("#formQLSV").reset();
    document.getElementById("txtMaSV").readOnly = false;
  }

  //validation dữ liệu
};



function timKiemSinhVien (event){
  let keyWord = removeVietnameseTones((event.target.value.trim().toLowerCase()))
  let arrTimKiem = arrSinhVien.filter((item, index) => {
    let tenSinhVienFilter = removeVietnameseTones(item.txtTenSV.trim().toLowerCase())
    return tenSinhVienFilter.includes(keyWord); 
  }
  
)
renderDataSinhVien(arrTimKiem);
  
  // 
}

document.getElementById("txtSearch").oninput = timKiemSinhVien;








// // Thao tác với localstored trong trình duyệt

// //
// localStorage.setItem("hoTen", "Nguyễn Hưng Phú");
// // sử dụng jsonString để chuyển object thành chuỗi mới set item đc

// let jsonString = JSON.stringify([{ hoTen: "a" }]);
// localStorage.setItem("arr", jsonString);
// let hoTen = localStorage.getItem("hoTen");
// console.log(hoTen);
// // đối với object or array phải chuyển chuỗi jason về object or array
// let dataLocal = JSON.parse(localStorage.getItem("arr"));

// localStorage.removeItem("hoTen");
