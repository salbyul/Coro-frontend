import { ref } from 'vue';

export const name = ref('');
export const introduction = ref('');
export const visible = ref('true');
export const type = ref('faceToFace');
export const photo = ref(null);
export const isDeletedPhoto = ref(false);
const tagList = ref([]);

export const changeFile = (file) => {
    photo.value = file;
};

export const addTag = (tag) => {
    validateTag(tag);
    tagList.value.push(tag);
};

const validateTag = (tag) => {
    validateTagName(tag);
    validateDuplicateTag(tag);
};
const validateTagName = (tag) => {
    const regex = /[0-9a-zA-Z가-힣]{1,10}/;
    const result = tag.match(regex);
    if (result === null || result[0] !== result.input) {
        throw new Error(
            '태그는 한글, 숫자, 영문으로 1자 이상, 10자 이하 이어야 합니다.'
        );
    }
};

const validateDuplicateTag = (tag) => {
    for (let i = 0; i < tagList.value.length; i++) {
        const existTag = tagList.value.at(i);
        if (existTag === tag) {
            throw new Error('같은 이름의 태그를 추가할 수 없습니다.');
        }
    }
};

export const deleteTag = (tag) => {
    const tagIndex = tagList.value.findIndex((existTag) => existTag === tag);
    tagList.value.splice(tagIndex, tagIndex + 1);
};

export const generateMoimObject = () => {
    return {
        name: name.value,
        introduction: introduction.value,
        type: type.value,
        visible: visible.value === 'true',
        isDeletedPhoto: isDeletedPhoto.value,
    };
};

export const generateTagListObject = () => {
    return {
        tagList: tagList.value,
    };
};

export const verifyData = () => {
    return validateName() && validateIntroduction();
};

const validateName = () => {
    if (name.value.length < 1 || name.value.length >= 30) {
        alert('모임명은 1자 이상, 30자 이하이어야 합니다.');
        return false;
    }
    return true;
};

const validateIntroduction = () => {
    if (introduction.value > 500) {
        alert('모임 소개는 500자 이내로 작성이 가능합니다.');
        return false;
    }
    return true;
};

export const moimDataInit = () => {
    name.value = '';
    introduction.value = '';
    visible.value = 'true';
    type.value = 'faceToFace';
    tagList.value = [];
};
