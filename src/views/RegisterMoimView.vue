<script setup></script>
<template>
    <div class="text-center">
        <!-- 모임 명 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 명</h2>
            <input
                type="text"
                placeholder="모임명을 입력하세요."
                class="border py-1 w-5/12 text-center"
            />
        </div>

        <!-- 모임 소개 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 소개</h2>
            <textarea
                placeholder="500자 이내로 모임을 소개해주세요."
                class="resize-none w-5/12 border p-2.5"
            ></textarea>
        </div>

        <!-- 비공개 여부 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">비공개 여부</h2>
            <input type="checkbox" value="true" id="visible" class="mr-2" />
            <label :for="visible">비공개</label>
        </div>

        <!-- 태그 -->
        <div class="my-7">
            <h2 class="text-xl mb-3">모임 태그</h2>
            <input
                type="text"
                placeholder="태그를 입력해주세요."
                class="border py-1 w-5/12 text-center"
            />
            <div>
                <!-- 태그를 추가하면 여기에 나타나고 태그를 제거할 수 있다. 로직 작성해야 함-->
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
            />
            <label :for="faceToFace" class="mr-4">대면</label>
            <input
                type="radio"
                name="type"
                id="nonContact"
                value="nonContact"
                class="mr-2"
            />
            <label :for="nonContact" class="mr-4">비대면</label>
            <input
                type="radio"
                name="type"
                id="mixed"
                value="mixed"
                class="mr-2"
            />
            <label :for="mixed" class="mr-4">혼합</label>
        </div>

        <!-- 버튼 -->
        <div>
            <button
                class="px-3 py-1.5 border duration-150 bg-green-200 rounded-md mr-10 hover:duration-150 hover:bg-green-300"
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
