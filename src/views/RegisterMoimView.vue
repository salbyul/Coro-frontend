<script setup>
import { onBeforeMount } from 'vue';
import {
    moimDataInit,
    name,
    introduction,
    visible,
    addTag,
    deleteTag,
    type,
    generateMoimObject,
    generateTagListObject,
    verifyData,
} from '../composables/useHandlingMoimData';
import { moimRegister } from '../api/moim';
import { applicationQuestionRegister } from '../api/applicationQuestion';
import {
    questionListInit,
    addQuestion,
    deleteQuestion,
    getQuestionList,
    sequence,
} from '../composables/useHandlingApplicationData';

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

// 모임 생성 버튼
async function submit() {
    try {
        if (!verifyData()) {
            return;
        }
        const moim = generateMoimObject();
        const tagList = generateTagListObject();

        const form = new FormData();

        const jsonMoim = JSON.stringify(moim);
        const moimBlob = new Blob([jsonMoim], { type: 'application/json' });
        form.append('moim', moimBlob);

        const jsonTagList = JSON.stringify(tagList);
        const tagListBlob = new Blob([jsonTagList], {
            type: 'application/json',
        });
        form.append('tagList', tagListBlob);

        const data = await moimRegister(form);
        const id = data.body.moimId;
        await applicationQuestionRegister(getQuestionList(), id);
        window.location.href = `/moim/${id}`;
    } catch (error) {
        console.log(error);
        if (code === '211') {
            alert('모임명이 중복됩니다.');
        } else if (code === '242') {
            alert('태그가 올바르지 않습니다.');
        }
    }
}

const clickAddQuestion = (e) => {
    const questionBox = document.getElementById('applicationBox');

    const div = document.createElement('div');
    div.className = 'flex justify-center my-4';
    div.id = 'application' + sequence.value++;

    const textarea = document.createElement('textarea');
    textarea.className =
        'resize-none w-5/12 border p-2.5 placeholder:text-center';
    textarea.placeholder = '지원자에게 물어볼 질문을 적어주세요.';

    const button = document.createElement('button');
    button.className =
        'border px-3 py-1.5 bg-red-200 rounded-full block ml-4 my-2 duration-150 hover:duration-150 hover:bg-red-300';
    button.innerText = 'X';
    button.onclick = clickDeleteQuestion;

    div.appendChild(textarea);
    div.append(button);
    questionBox.insertBefore(div, e.target);
    addQuestion(div);
    textarea.focus();
};

const clickDeleteQuestion = (e) => {
    const questionBox = e.target.parentNode;
    deleteQuestion(questionBox);
    questionBox.remove();
};

onBeforeMount(() => {
    moimDataInit();
    questionListInit();
});
</script>
<template>
    <div class="text-center">
        <!-- 모임 명 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 명</h2>
            <input
                type="text"
                placeholder="모임명을 입력하세요."
                class="border py-1 w-5/12 text-center"
                v-model="name"
            />
        </div>

        <!-- 모임 소개 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 소개</h2>
            <textarea
                placeholder="500자 이내로 모임을 소개해주세요."
                class="resize-none w-5/12 border p-2.5 placeholder:text-center"
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
                    @click="clickAddQuestion"
                >
                    +
                </button>
            </div>
        </div>

        <!-- 버튼 -->
        <div>
            <button
                class="px-3 py-1.5 border duration-150 bg-green-200 rounded-md mr-10 hover:duration-150 hover:bg-green-300"
                @click="submit"
            >
                생성
            </button>
            <button
                class="px-3 py-1.5 border duration-150 bg-gray-200 rounded-md hover:duration-150 hover:bg-gray-300"
            >
                취소
            </button>
        </div>
    </div>
</template>
