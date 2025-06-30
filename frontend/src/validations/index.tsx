import * as yup from "yup";

// User

export const customerInfoSchema = yup.object().shape({
  // firstName: yup.string().required("Vui lòng nhập họ"),
  // lastName: yup.string().required("Vui lòng nhập tên"),
  // email: yup.string().email("Vui lòng nhập email hợp lệ").required("Vui lòng nhập email"),
  // phone: yup
  //   .string()
  //   .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
  //   .max(10, "Số điện thoại không hợp lệ")
  //   .required("Vui lòng nhập số điện thoại"),
  // province: yup.object().required("Vui lòng chọn Tỉnh/thành phố"),
  // district: yup.object().required("Vui lòng chọn Quận/huyện"),
  // ward: yup.object().required("Vui lòng chọn Phường/xã"),
  // birth: yup.string().required("Vui lòng nhập ngày sinh"),
  // gender: yup.string().required("Vui lòng chọn giới tính"),
  // addressDetail: yup.string().required("Vui lòng nhập địa chỉ"),
});

export const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ tên"),
  phone: yup.string().matches(/^\d+$/, "Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại"),
  province: yup.object().required("Vui lòng chọn Tỉnh/thành phố"),
  district: yup.object().required("Vui lòng chọn Quận/huyện"),
  ward: yup.object().required("Vui lòng chọn Phường/xã"),
  address: yup.string().required("Vui lòng nhập Địa chỉ"),
  paymentMethod: yup.string().required("Vui lòng chọn Phương thức thanh toán"),
  deliveryMethod: yup.string().required("Vui lòng chọn Phương thức giao hàng"),
});

export const adminUserInfoSchema = yup.object().shape({
  name: yup.string().required("Vui lòng điền họ và tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng điền địa chỉ email"),
  phone: yup.string().matches(/^\d+$/, "Số điện thoại không hợp lệ").required("Vui lòng điền số điện thoại"),
  address: yup.string().required("Vui lòng điền địa chỉ"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
});

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required("Vui lòng điền họ"),
  lastName: yup.string().required("Vui lòng điền tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng điền email"),
  phone: yup.string().matches(/^\d+$/, "Số điện thoại không hợp lệ").required("Vui lòng điền số điện thoại"),
  birth: yup.date().required("Vui lòng chọn ngày sinh"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  province: yup.object().required("Vui lòng chọn Tỉnh/Thành phố"),
  district: yup.object().required("Vui lòng chọn Quận/Huyện"),
  ward: yup.object().required("Vui lòng chọn Phường/Xã"),
  addressDetail: yup.string().required("Vui lòng điền địa chỉ cụ thể"),
  password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng điền mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
  acceptTermAndPolicy: yup.boolean().oneOf([true], "Vui lòng chấp nhận điều khoản và chính sách"),
});

export const forgotPasswordSchema = yup.object().shape({
  emailOrPhone: yup.string().email("Vui lòng nhập email hợp lệ").required("Vui lòng nhập email"),
});

export const resetPasswordSchema = yup.object().shape({
  otpCode: yup.string().required("Vui lòng nhập OTP"),
  newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập mật khẩu xác nhận"),
});

export const adminSchema = yup.object().shape({
  firstName: yup.string().required("Vui lòng điền tên"),
  lastName: yup.string().required("Vui lòng điền họ"),
  role: yup.string().required("Vui lòng chọn quyền hạn"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng điền địa chỉ email"),
  phone: yup.string().matches(/^\d+$/, "Số điện thoại không hợp lệ").required("Vui lòng điền số điện thoại"),
  password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng điền mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export const updateAdminSchema = yup.object().shape({
  firstName: yup.string().required("Vui lòng điền tên"),
  lastName: yup.string().required("Vui lòng điền họ"),
  role: yup.string().required("Vui lòng chọn quyền hạn"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng điền địa chỉ email"),
  phone: yup.string().matches(/^\d+$/, "Số điện thoại không hợp lệ").required("Vui lòng điền số điện thoại"),
});

//Product

const productOptionSchema = yup.object().shape({
  colorHexCode: yup
    .string()
    .required("Vui lòng nhập mã màu")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Mã màu không hợp lệ"),
  colorName: yup.string().required("Vui lòng nhập tên màu"),
  size: yup.string().required("Vui lòng chọn kích cỡ"),
  stock: yup
    .number()
    .typeError("Vui lòng nhập số lượng tồn kho hợp lệ")
    .required("Vui lòng nhập số lượng tồn kho")
    .min(0, "Số lượng tồn kho không thể nhỏ hơn 0"),
});

const costSchema = yup.object().shape({
  ingredientCost: yup
    .number()
    .typeError("Vui lòng nhập giá trị hợp lệ")
    .required("Vui lòng nhập chi phí nguyên liệu")
    .min(0, "Chi phí không thể nhỏ hơn 0"),
  productionCost: yup
    .number()
    .typeError("Vui lòng nhập giá trị hợp lệ")
    .required("Vui lòng nhập chi phí sản xuất")
    .min(0, "Chi phí không thể nhỏ hơn 0"),
  saleCost: yup
    .number()
    .typeError("Vui lòng nhập giá bán hợp lệ")
    .required("Vui lòng nhập giá bán")
    .min(0, "Giá bán không thể nhỏ hơn 0"),
  discountPercentage: yup
    .number()
    .typeError("Vui lòng nhập giá trị hợp lệ")
    .required("Vui lòng nhập phần trăm giảm giá")
    .min(0, "Phần trăm giảm giá không thể nhỏ hơn 0")
    .max(100, "Phần trăm giảm giá không thể lớn hơn 100"),
});

export const productSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
  preserveDescription: yup.string().required("Vui lòng nhập mô tả bảo quản"),
  material: yup.string().required("Vui lòng nhập chất liệu sản phẩm"),
  images: yup
    .array()
    .of(yup.mixed().required("Vui lòng chọn ảnh"))
    .min(1, "Vui lòng chọn ít nhất một ảnh")
    .required("Vui lòng chọn ảnh"),
  // collection: yup.mixed().required("Vui lòng chọn bộ sưu tập"),
  options: yup
    .array()
    .min(1, "Vui lòng thêm ít nhất 1 tùy chọn")
    .of(
      productOptionSchema.test({
        name: "isProductOption",
        message: "Vui lòng nhập đầy đủ thông tin",
        test: (value) => typeof value === "string" || productOptionSchema.isValidSync(value),
      }),
    )
    .required("Vui lòng thêm ít nhất 1 tùy chọn"),
  cost: costSchema.required("Vui lòng nhập chi phí hiện tại"),
});

// Category

export const categorySchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
});

// Collection

export const createCollectionSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên bộ sưu tập"),
  groupId: yup.mixed().required("Vui lòng chọn nhóm"),
});

export const updateCollectionSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên bộ sưu tập"),
});

// Collection group

export const createGroupSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên nhóm"),
  categoryId: yup.mixed().required("Vui lòng chọn danh mục"),
  collections: yup.array().min(1, "Vui lòng chọn ít nhât 1 bộ sưu tập").required("Vui lòng chọn bộ sưu tập"),
});

export const updateGroupSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên nhóm"),
  collections: yup.array().min(1, "Vui lòng chọn ít nhât 1 bộ sưu tập").required("Vui lòng chọn bộ sưu tập"),
});

export const purchaseFormSchema = yup.object().shape({
  color: yup.string().required("Vui lòng chọn màu sắc"),
  size: yup.string().required("Vui lòng chọn kích thước"),
  quantity: yup.number().min(1, "Vui lòng chọn số lượng sản phẩm"),
});
