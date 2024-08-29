// check khi gnuowif dùng để input rỗng
export function checkEmptyValue(value, theThongBao) {
  if (!value) {
    theThongBao.innerHTML = "vui lòng không để trống";
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

//check Email, checkk điểm(số, o--> 10), kiểm tra chuỗi, mật khẩu phải có 1 kí tự đặc biệt

export function checkEmailValue(value, theThongBao) {
  // sử dụng chuỗi regex
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // các phương thức của regex
  regexEmail.test(value); // trả về true or false để check email
  let hopLe = regexEmail.test(value); // true // false

  if (hopLe) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "vui lòng nhập email theo đúng cú pháp";
    return false;
  }
}

export function checkPassValue(value, theThongBao) {
  let regexPass = /[!@#$%^&*(),.?":{}|<>]/;

  let hopLe = regexPass.test(value);
  console.log(hopLe);
  if (hopLe) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "vui lòng nhập mật khẩu có ít nhật 1 kí tự đặc biệt";
    return false;
  }
}

export function checkStringValue(value, theThongBao) {
  let regexString = /^[^\d]+$/;
  let hopLe = regexString.test(value);
  if (hopLe) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "vui lòng nhập mật khẩu có ít nhật 1 kí tự đặc biệt";
    return false;
  }
}

export function checkNumberValue(value, theThongBao) {
  let regexIsNumber = /^\d+$/;
  let hopLe = regexIsNumber.test(value);
  if (hopLe) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "vui lòng nhập chỉ nhập số";
    return false;
  }
}

export function checkMinMaxValue(value, theThongBao, min, max) {
  let checkNumberString = value.length;
  console.log(checkNumberString);
  if (min <= checkNumberString && checkNumberString <= max) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = `vui lòng nhập đúng từ ${min} đến ${max}`;
    return false;
  }
}
