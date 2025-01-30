import type { LoginData } from "@/type/ILoginData";
import type { RegisterData } from "@/type/IRegisterData";
import type { TodoAddData } from "@/type/ITodoAddData";

export const registerValidator = (data: RegisterData) => {
  if(data.nickname.trim() === ''){
    alert('닉네임은 필수 입력값입니다.');
    return false;
  }

  if(data.email.trim() === ''){
    alert('이메일은 필수 입력값입니다.');
    return false;
  }

  if(data.password.trim() === ''){
    alert('비밀번호는 필수 입력값입니다.');
    return false;
  }

  return true;
}

export const loginValidator = (data: LoginData) => {
  if(data.email.trim() === ''){
    alert('이메일은 필수 입력값입니다.');
    return false;
  }

  if(data.password.trim() === ''){
    alert('비밀번호는 필수 입력값입니다.');
    return false;
  }

  return true;
}

export const todoAddValidator = (data: TodoAddData) => {
  if (data.content.trim() === '') {
    alert('입력란이 비어있습니다.');
    return false;
  }

  return true;
}