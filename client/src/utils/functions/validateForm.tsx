interface FormValue {
  email: string;
  password: string;
}

const emailReg = new RegExp(/\w+@\w+.\w+/);

const validateForm = (value: FormValue) => {
  const { email, password } = value;
  if (!email) return '이메일은 필수 입력 정보입니다';
  if (!password) return '비밀번호는 필수 입력 정보입니다';
  if (password.length < 6 || password.length > 14)
    return '비밀번호는 6자 ~ 14자이여야 합니다.';
  if (!emailReg.exec(email)) return '이메일 형식(xxx@xxx.xxx)을 지켜야 합니다.';
  return 'ok';
};

export default validateForm;
