//import và export


export class SinhVien {
    //   mssv = "abc";
    //   tenSinhVien = "";
    //   ngaySinh = "";
    //   email = "";
    //   matKhau = "";
    //   diemToan = 0;
    //   diemLy = 0;
    //   diemHoa = 0;
  
    // Hàm khởi tạo sẽ được tự động kích hoạt khi lớp đối tượng được gọi và sử dụng
    constructor(
      txtMaSV,
      txtTenSV,
      txtEmail,
      txtPass,
      txtNgaySinh,
      khSV,
      txtDiemToan,
      txtDiemLy,
      txtDiemHoa
    ) {
      this.txtMaSV = txtMaSV;
      this.txtTenSV = txtTenSV;
      this.txtEmail = txtEmail;
      this.txtPass = txtPass;
      this.txtNgaySinh = txtNgaySinh;
      this.khSV = khSV;
      this.txtDiemToan = txtDiemToan;
      this.txtDiemLy = txtDiemLy;
      this.txtDiemHoa = txtDiemHoa;
    }
  
    tinhDiemTrungBinh = function () {
      let tong = this.txtDiemToan *1 + this.txtDiemLy *1 + this.txtDiemHoa *1;
      console.log(tong / 3);
      return tong / 3;
    }
  }
const hoTenA = "Nguyễn Hưng Gia"
export default hoTenA; 