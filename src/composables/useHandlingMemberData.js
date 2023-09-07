import { ref } from 'vue';

export const email = ref('');
export const password = ref('');
export const checkPassword = ref('');
export const nickname = ref('');

export const verifyData = () => {
    return verifyEmail() && verifyPassword() && verifyNickname();
};

const verifyEmail = () => {
    // const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const matches = regex.test(email.value);
    if (!matches) {
        alert('이메일 형식을 확인해주세요.');
    }
    return matches;
};

const verifyPassword = () => {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,29}$/;
    const matches = regex.test(password.value);
    if (!matches) {
        alert('비밀번호 조건을 확인해주세요.');
        return false;
    }
    if (password.value !== checkPassword.value) {
        alert('비밀번호가 같지 않습니다.');
        return false;
    }
    return true;
};

const verifyNickname = () => {
    const regex = /[\wㄱ-ㅎ가-힣-]{2,15}/;
    const matches = regex.test(nickname.value);
    if (!matches) {
        alert('닉네임 조건을 확인해주세요.');
    }
    return matches;
};

export const createMemberObject = () => {
    const member = {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
    };
    return member;
};
