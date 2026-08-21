class NhanVien {
    constructor( taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCB = Number(luongCoBan);
        this.chucVu = chucVu;
        this.gioLam = Number(gioLam);
        this.tongLuong = this.tinhTongLuong();
        this.loaiNhanVien = this.xepLoai();
    }
    tinhTongLuong() {
        switch(this.chucVu) {
            case "giám đốc": {
                return this.luongCB * 3;
                break;
            }
            case "trưởng phòng": {
                return this.luongCB * 2;
                break;
            }
            case "nhân viên": {
                return this.luongCB;
                break;
            }
        }
    }
    xepLoai() {
        if(this.gioLam > 192) {
            return "xuất sắc";
        }
        if(this.gioLam > 176) {
            return "giỏi";
        }
        if(this.gioLam > 160) {
            return "khá";
        }
        return "trung bình";
    }
}

let nhanviens = [
    new NhanVien("1234", "Nguyen Van An", "nguyenvana@gmail.com", "Pass@123", "10/15/2023", 20000000, "giám đốc", 180),
    new NhanVien("56789", "Tran Thi Binh", "tranthibinh@yahoo.com", "Secret#45", "11/20/2023", 10000000, "trưởng phòng", 160),
    new NhanVien("123456", "Le Van Cuong", "levancuong@outlook.com", "LeVan@09", "01/05/2024", 5000000, "nhân viên", 120),
    new NhanVien("4567", "Pham Dao Dung", "phamdaodung@company.com", "Dao!1234", "02/14/2024", 8000000, "nhân viên", 190),
    new NhanVien("88888", "Vo Thi Em", "vothiem@mail.com", "Vothi*56", "03/10/2024", 15000000, "trưởng phòng", 100)
];

let nhanvienShow = nhanviens;

function dom(selector) {
    return document.querySelector(selector);
}

let body = dom("body");
let modal = dom("#myModal");
let btnForm = dom("#btnThem");
let taiKhoanInput = dom("#tknv");
let taiKhoanError = dom("#tbTKNV");
let hoTenInput = dom("#name");
let hoTenError = dom("#tbTen");
let emailInput = dom("#email");
let emailError = dom("#tbEmail");
let matKhauInput = dom("#password");
let matKhauError = dom("#tbMatKhau");
let ngayLamInput = dom("#datepicker");
let ngayLamError = dom("#tbNgay");
let luongCBInput = dom("#luongCB");
let luongCBError = dom("#tbLuongCB");
let chucVuInput = dom("#chucVu");
let chucVuError = dom("#tbChucVu");
let gioLamInput = dom("#gioLam");
let gioLamError = dom("#tbGiolam");
let btnAdd = dom("#btnThemNV");
let btnUpdate = dom("#btnCapNhat");
let btnClose = dom("#btnDong");
let searchInput = dom("#searchName");
let btnSearch = dom("#btnTimNV");

function reload() {
    let listBody = dom("#tableDanhSach");
    let html = nhanvienShow.map(nhanvien => {
        return `<tr>
            <td>${nhanvien.taiKhoan}</td>
            <td>${nhanvien.hoTen}</td>
            <td>${nhanvien.email}</td>
            <td>${nhanvien.ngayLam}</td>
            <td>${nhanvien.chucVu}</td>
            <td>${nhanvien.tongLuong}</td>
            <td>${nhanvien.loaiNhanVien}</td>
            <td class="d-flex">
                <button class="btn btn-info mr-2" onclick="openUpdateForm('${nhanvien.taiKhoan}')" data-toggle="modal"
									data-target="#myModal">Update</button>
                <button class="btn btn-danger" onclick="deleteEmployee('${nhanvien.taiKhoan}')">Delete</button>
            </td>
        </tr>`
    }).join("");
    listBody.innerHTML = html;
}

function kiemTraTaiKhoan() {
    const regex = /^\d{4,6}$/;
    let value = taiKhoanInput.value.trim();
    if(!regex.test(value)) {
        taiKhoanError.textContent = "Tài khoản phải chứa từ 4 đến 6 ký tự số";
        taiKhoanError.style.display = "block";
        return false;
    }
    taiKhoanError.innerText = "";
    taiKhoanError.style.display = "None";
    return true;
}

function kiemTraHoTen() {
    const regex = /^[\p{L}\s]+$/u;
    let value = hoTenInput.value.trim();
    if(!regex.test(value)) {
        hoTenError.textContent = "Họ tên phải ở dạng chữ và không được để trống";
        hoTenError.style.display = "block";
        return false;
    }
    hoTenError.innerText = "";
    hoTenError.style.display = "None";
    return true;
}

function kiemTraEmail() {
    if(emailInput.validity.typeMismatch) {
        emailError.textContent = "Sai định dạng email";
        emailError.style.display = "block";
        return false;
    }
    if(emailInput.value.trim() == "") {
        emailError.textContent = "Email không được để trống";
        emailError.style.display = "block";
        return false;
    }
    emailError.innerText = "";
    emailError.style.display = "None";
    return true;
}

function kiemTraPassword() {
    const regex = /^[\p{L}\s]+$/u;
    let value = hoTenInput.value.trim();
    if(!regex.test(value)) {
        hoTenError.textContent = "Họ tên phải ở dạng chữ và không được để trống";
        hoTenError.style.display = "block";
        return false;
    }
    hoTenError.innerText = "";
    hoTenError.style.display = "None";
    return true;
}

function kiemTraMatKhau() {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/; 
    let value = matKhauInput.value.trim();
    if(!regex.test(value)) {
        matKhauError.textContent = "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống";
        matKhauError.style.display = "block";
        return false;
    }
    matKhauError.innerText = "";
    matKhauError.style.display = "none";
    return true;
}

function kiemTraNgayLam() {
    let value = ngayLamInput.value.trim();
    try {
        !$.datepicker.parseDate("mm/dd/yy", value)
        ngayLamError.innerText = "";
        ngayLamError.style.display = "none";
        return true;
    }
    catch(err) {
        ngayLamError.textContent = "Giá trị ngày làm không hợp lệ";
        ngayLamError.style.display = "block";
        return false;
    }
}

function kiemTraLuongCB() {
    let value = Number(luongCBInput.value);
    if ( luongCBInput.value == "") {
        luongCBError.textContent = "Lương cơ bản phải ở định dạng số";
        luongCBError.style.display = "block";
        return false;
    }
    if ( value < 1000000 || value > 20000000 ) {
        luongCBError.textContent = "Lương cơ bản 1 000 000 - 20 000 000, không để trống";
        luongCBError.style.display = "block";
        return false;
    }
    luongCBError.innerText = "";
    luongCBError.style.display = "none";
    return true;
}

function kiemTraChucVu() {
    let value = chucVuInput.value.trim();
    if(value == "") {
        chucVuError.textContent = "Chức vụ không được để trống";
        chucVuError.style.display = "block";
        console.log("Chức vụ: " + value);
        return false;
    }
    chucVuError.innerText = "";
    chucVuError.style.display = "none";
    return true;
}

function kiemTraGioLam() {
    let value = Number(gioLamInput.value);
    if(gioLamInput.value == "") {
        gioLamError.textContent = "Giờ làm phải ở dạng số";
        gioLamError.style.display = "block";
        return false;
    }
    if(value < 80 || value > 200) {
        gioLamError.textContent = "Giờ làm phải nằm trong khoảng từ 80 đến 200";
        gioLamError.style.display = "block";
        return false;
    }
    gioLamError.innerText = "";
    gioLamError.style.display = "none";
    return true;
}

function configFormValidate() {
    taiKhoanInput.addEventListener("blur", kiemTraTaiKhoan);
    hoTenInput.addEventListener("blur", kiemTraHoTen);
    emailInput.addEventListener("blur", kiemTraEmail);
    matKhauInput.addEventListener("blur", kiemTraMatKhau);
    ngayLamInput.addEventListener("blur", kiemTraNgayLam);
    luongCBInput.addEventListener("blur", kiemTraLuongCB);
    chucVuInput.addEventListener("blur", kiemTraChucVu);
    gioLamInput.addEventListener("blur", kiemTraGioLam);
}

function configFormButton(action) {
    if(action == "add") {
        btnAdd.disabled = false; 
        btnUpdate.disabled = true;
    }
    if(action == "update") {
        btnAdd.disabled = true;
        btnUpdate.disabled = false;
    }
}

function getFormInput() {
    let taiKhoan = taiKhoanInput.value;
    let hoTen = hoTenInput.value;
    let email = emailInput.value;
    let matKhau = matKhauInput.value;
    let ngayLam = ngayLamInput.value;
    let chucVu = chucVuInput.value;
    let luongCB = Number(luongCBInput.value); 
    let gioLam = Number(gioLamInput.value);

    let nhanVien = new NhanVien(
        taiKhoan = taiKhoan,
        hoTen = hoTen,
        email = email,
        matKhau = matKhau,
        ngayLam = ngayLam,
        luongCB = luongCB,
        chucVu = chucVu,
        gioLam = gioLam
    );

    return nhanVien;
}

function clearForm() {
    taiKhoanInput.value = "";
    hoTenInput.value = "";
    emailInput.value = "";
    matKhauInput.value = "";
    ngayLamInput.value = "";
    luongCBInput.value = "";
    chucVuInput.value = "";
    gioLamInput.value = "";
    taiKhoanError.textContent = "";
    hoTenError.textContent = "";
    emailError.textContent = "";
    matKhauError.textContent = "";
    ngayLamError.textContent = "";
    luongCBError.textContent = "";
    chucVuError.textContent = "";
    gioLamError.textContent = "";
}

function addEmployee() {
    if (kiemTraTaiKhoan() && kiemTraHoTen() && kiemTraEmail() && kiemTraMatKhau() && kiemTraNgayLam() && kiemTraLuongCB() && kiemTraChucVu() && kiemTraGioLam()) {
        nhanviens.push(getFormInput());
    }
    clearForm();
    reload();
}

function updateEmployee() {
    if (kiemTraTaiKhoan() && kiemTraHoTen() && kiemTraEmail() && kiemTraMatKhau() && kiemTraNgayLam() && kiemTraLuongCB() && kiemTraChucVu() && kiemTraGioLam()) {
        let nhanvienForm = getFormInput();
        index = nhanviens.findIndex(nhanvien => nhanvien.taiKhoan == nhanvienForm.taiKhoan);
        nhanviens[index] = nhanvienForm;
        nhanvienShow = nhanviens;
        taiKhoanInput.disabled = false;
    }
    clearForm();
    reload();
}

function openUpdateForm(taiKhoan) {
    nhanVien = nhanviens.filter(nhanvien => nhanvien.taiKhoan == taiKhoan)[0];
    taiKhoanInput.value = nhanVien.taiKhoan;
    hoTenInput.value = nhanVien.hoTen;
    emailInput.value = nhanVien.email;
    matKhauInput.value = nhanVien.matKhau;
    ngayLamInput.value = nhanVien.ngayLam;
    luongCBInput.value = nhanVien.luongCB;
    chucVuInput.value = nhanVien.chucVu;
    gioLamInput.value = nhanVien.gioLam;
    configFormButton("update");
    taiKhoanInput.disabled = true;
}

function deleteEmployee(taiKhoan) {
    nhanviens = nhanviens.filter(nhanvien => nhanvien.taiKhoan != taiKhoan);
    nhanvienShow = nhanviens;
    reload();
}

function searchEmployee() {
    let value = searchInput.value.trim();
    if(value == 'xuất sắc') {
        nhanvienShow = nhanviens.filter(nhanvien => nhanvien.loaiNhanVien == 'xuất sắc');
        reload();
        return;
    }
    if(value == 'giỏi') {
        nhanvienShow = nhanviens.filter(nhanvien => nhanvien.loaiNhanVien == 'giỏi');
        reload();
        return;
    }
    if(value == 'khá') {
        nhanvienShow = nhanviens.filter(nhanvien => nhanvien.loaiNhanVien == 'khá');
        reload();
        return;
    }
    if(value == 'trung bình') {
        nhanvienShow = nhanviens.filter(nhanvien => nhanvien.loaiNhanVien == 'trung bình');
        reload();
        return;
    }
    nhanvienShow = nhanviens;
    reload();
}

reload();
configFormValidate();
btnForm.addEventListener("click", () => configFormButton("add"));
btnAdd.addEventListener("click", () => addEmployee());
btnUpdate.addEventListener("click", () => updateEmployee());
btnClose.addEventListener("click", () => clearForm());
btnSearch.addEventListener("click", () => searchEmployee());