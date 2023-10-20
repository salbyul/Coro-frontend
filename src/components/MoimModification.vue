<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchDataForModification, updateMoim } from '../api/moim';
import {
    moimDataInit,
    name,
    introduction,
    visible,
    type,
    photo,
    addTag,
    changeFile,
    isDeletedPhoto,
    deleteTag,
    verifyData,
    generateMoimObject,
    generateTagListObject,
} from '../composables/useHandlingMoimData';
import {
    questionListInit,
    addQuestion,
    deleteQuestion,
    getQuestionList,
    sequence,
    canAddQuestion,
} from '../composables/useHandlingApplicationQuestionData';

const route = useRoute();
const id = route.params.id;
const hasPhoto = ref(false);
const initPhoto = ref('');
const initPhotoName = ref('');
const contentType = ref('');

const dataMapping = (data) => {
    name.value = data.name;
    introduction.value = data.introduction;
    for (let i = 0; i < data.tagList.length; i++) {
        const tag = data.tagList.at(i);
        addTag(tag);
        addTagDiv(tag);
    }
    visible.value = data.visible;
    type.value = data.type;
    initPhoto.value = data.photo;
    initPhotoName.value = data.photoName;
    if (initPhoto.value !== null) {
        hasPhoto.value = true;
    }
    contentType.value = data.contentType;
    const questionAddButton = document.getElementById('questionAddButton');
    for (let i = 0; i < data.applicationQuestionList.length; i++) {
        const question = data.applicationQuestionList.at(i);
        clickAddQuestion(questionAddButton, question.content);
    }
};

const preview = () => {
    const previewPhoto = createNewPreviewPhoto();
    const reader = new FileReader();
    reader.readAsDataURL(photo.value);
    reader.onload = () => {
        previewPhoto.src = reader.result;
    };
};

// 모임 사진 미리보기 생성 메서드
const createNewPreviewPhoto = () => {
    var previewPhoto = document.getElementById('previewPhoto');
    if (previewPhoto !== null) {
        previewPhoto.remove();
    }
    previewPhoto = document.createElement('img');
    previewPhoto.id = 'previewPhoto';
    previewPhoto.className = 'w-7/12 mx-auto my-3 hover:cursor-pointer';
    previewPhoto.onclick = removePhoto;

    const photoBox = document.getElementById('photoBox');
    photoBox.appendChild(previewPhoto);
    return previewPhoto;
};

// 모임 사진 클릭 시 삭제 메서드
const removePhoto = () => {
    photo.value = null;
    const previewPhoto = document.getElementById('previewPhoto');
    previewPhoto.remove();

    const photoInput = document.getElementById('photoInput');
    photoInput.value = '';
    isDeletedPhoto.value = true;
};

// 모임 사진 변경 시 메서드
const onChangedPhoto = (e) => {
    if (e.target.files.length === 0) {
        return;
    }
    changeFile(e.target.files[0]);
    preview();
    isDeletedPhoto.value = false;
};

// 태그 추가 메서드
function clickAddTag(e) {
    const tag = e.target.value;
    try {
        addTag(tag);
        addTagDiv(tag);
        e.target.value = '';
    } catch (error) {
        alert(error.message);
    }
}

// 태그 화면에 추가 메서드
function addTagDiv(tag) {
    const tagBox = document.getElementById('tagBox');
    const tagBtn = document.createElement('button');
    tagBtn.className =
        'block mx-auto border px-3 duration-150 hover:duration-150 hover:bg-gray-50 mt-2';
    tagBtn.innerText = tag;
    tagBtn.onclick = (e) => clickDeleteTag(e);
    tagBtn.id = 'tag-' + tag;
    tagBox.appendChild(tagBtn);
}

// 태그 제거 메서드
function clickDeleteTag(e) {
    const tag = e.target.innerText;
    deleteTag(tag);
    const element = document.getElementById('tag-' + tag);
    element.remove();
}

// 질문 추가 버튼 클릭 시
const clickAddQuestion = (questionAddButton, value) => {
    if (!canAddQuestion()) {
        alert('질문은 10개까지만 추가가 가능합니다.');
        return;
    }
    const questionBox = document.getElementById('applicationBox');

    const div = document.createElement('div');
    div.className = 'flex justify-center my-4';
    div.id = 'application' + sequence.value++;

    const textarea = document.createElement('textarea');
    textarea.className =
        'resize-none w-5/12 border p-2.5 placeholder:text-center';
    textarea.placeholder = '지원자에게 물어볼 질문을 적어주세요.';
    if (value !== undefined) {
        textarea.value = value;
    }
    const button = document.createElement('button');
    button.className =
        'border px-3 py-1.5 bg-red-200 rounded-full block ml-4 my-2 duration-150 hover:duration-150 hover:bg-red-300';
    button.innerText = 'X';
    button.onclick = clickDeleteQuestion;

    div.appendChild(textarea);
    div.append(button);
    questionBox.insertBefore(div, questionAddButton);
    addQuestion(div);
};

// 지원 질문 삭제 버튼 클릭 시
const clickDeleteQuestion = (e) => {
    const questionBox = e.target.parentNode;
    deleteQuestion(questionBox);
    questionBox.remove();
};

const submit = async () => {
    try {
        if (!verifyData()) {
            return;
        }
        const moim = generateMoimObject();
        const tagList = generateTagListObject();
        const questionList = getQuestionList();

        const form = new FormData();

        const jsonMoim = JSON.stringify(moim);
        const moimBlob = new Blob([jsonMoim], { type: 'application/json' });
        form.append('moim', moimBlob);

        const jsonTagList = JSON.stringify(tagList);
        const tagListBlob = new Blob([jsonTagList], {
            type: 'application/json',
        });
        form.append('tagList', tagListBlob);

        const jsonQuestionList = JSON.stringify(questionList);
        const questionBlob = new Blob([jsonQuestionList], {
            type: 'application/json',
        });
        form.append('applicationQuestionList', questionBlob);

        form.append('photo', photo.value);

        await updateMoim(id, form);
        window.location.href = `/moim/${id}`;
    } catch (error) {
        console.log(error);
        if (code === '211') {
            alert('모임명이 중복됩니다.');
        } else if (code === '242') {
            alert('태그가 올바르지 않습니다.');
        }
    }
};

onBeforeMount(async () => {
    try {
        moimDataInit();
        questionListInit();
        const data = await fetchDataForModification(id);
        dataMapping(data.body.detail);
    } catch (error) {
        console.log(error);
    }
});
</script>
<template>
    <div class="my-10">
        <h1 class="text-2xl">{{ name }}</h1>
        <!-- 모임 사진 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 사진</h2>
            <div id="photoBox">
                <img
                    v-if="hasPhoto"
                    v-bind:src="`data:${contentType};base64,${initPhoto}`"
                    v-bind:alt="initPhotoName"
                    class="w-7/12 mx-auto my-3 hover:cursor-pointer"
                    id="previewPhoto"
                    @click="removePhoto"
                />
            </div>
            <input
                type="file"
                hidden
                id="photoInput"
                accept="image/*"
                @change="onChangedPhoto"
            />
            <label
                for="photoInput"
                class="px-3 py-1.5 bg-gray-100 rounded-md duration-150 hover:duration-150 hover:bg-gray-200 hover:cursor-pointer"
            >
                사진 선택</label
            >
        </div>

        <!-- 모임 소개 -->
        <div class="my-5">
            <h2 class="text-xl mb-5">모임 소개</h2>
            <textarea
                class="resize-none w-7/12 h-96 border p-2.5 placeholder:text-center"
                v-model="introduction"
            ></textarea>
        </div>

        <!-- 공개 여부 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">비공개 여부</h2>
            <input
                type="radio"
                name="visible"
                id="visible"
                class="mr-2"
                value="true"
                v-model="visible"
                checked
            />
            <label for="visible" class="mr-4">공개</label>
            <input
                type="radio"
                name="visible"
                id="invisible"
                class="mr-2"
                value="false"
                v-model="visible"
            />
            <label for="invisible" class="mr-4">비공개</label>
        </div>

        <!-- 태그 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 태그</h2>
            <input
                type="text"
                placeholder="태그를 입력해주세요."
                class="border py-1 w-5/12 text-center"
                @keypress.enter="clickAddTag"
            />
            <div id="tagBox">
                <!-- 태그를 추가하면 여기에 나타나고 태그를 제거할 수 있다.-->
            </div>
        </div>

        <!-- 모임 유형 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 유형</h2>
            <input
                type="radio"
                name="type"
                id="faceToFace"
                value="faceToFace"
                checked
                class="mr-2"
                v-model="type"
            />
            <label for="faceToFace" class="mr-4">대면</label>
            <input
                type="radio"
                name="type"
                id="nonContact"
                value="nonContact"
                class="mr-2"
                v-model="type"
            />
            <label for="nonContact" class="mr-4">비대면</label>
            <input
                type="radio"
                name="type"
                id="mixed"
                value="mixed"
                class="mr-2"
                v-model="type"
            />
            <label for="mixed" class="mr-4">혼합</label>
        </div>
        <!-- 지원 양식 -->
        <div class="my-7">
            <h1 class="text-xl">지원 양식</h1>
            <div id="applicationBox">
                <div class="flex justify-center my-4" id="application1">
                    <!-- 지원 질문 추가되는 자리 -->
                </div>
                <button
                    class="border px-3 py-1.5 rounded-full block mx-auto my-2 duration-150 hover:duration-150 hover:bg-gray-50"
                    @click="(e) => clickAddQuestion(e.target)"
                    id="questionAddButton"
                >
                    +
                </button>
            </div>
        </div>
    </div>
    <div class="my-10">
        <button
            class="px-3 py-1.5 rounded-md bg-sky-200 text-gray-700 duration-150 hover:duration-150 hover:bg-sky-300 mr-20"
            @click="submit"
        >
            수정
        </button>
        <button
            class="px-3 py-1.5 rounded-md bg-red-200 text-gray-700 duration-150 hover:duration-150 hover:bg-red-300"
        >
            취소
        </button>
    </div>
</template>
