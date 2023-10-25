import { ref } from 'vue';

export const originalPassword = ref('');
export const newPassword = ref('');
export const newPasswordVerify = ref('');

export const validatePassword = () => {
    if (originalPassword.value.length === 0) {
        alert('기존 비밀번호를 입력해주세요.');
        return false;
    }
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,29}$/;
    const matches = regex.test(newPassword.value);
    if (!matches) {
        alert(
            '비밀번호는 영문, 숫자, 특수문자 포함 10자 이상, 30자 미만이어야 합니다.'
        );
        return false;
    }
    if (newPassword.value !== newPasswordVerify.value) {
        alert('비밀번호가 같지 않습니다.');
        return false;
    }
    return true;
};
