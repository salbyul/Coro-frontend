<script setup>
const hasImage = false; // 임시
</script>
<template>
    <div class="mx-auto w-7/12 text-center border-y">
        <div class="pb-2 mb-2">
            <div class="text-2xl text-gray-700 my-2">moim name</div>
            <div class="text-sm text-gray-500 flex justify-center">
                <span class="mx-2">tag1</span>
                <span class="mx-2">tag2</span>
                <span class="mx-2">tag3</span>
            </div>
            <div class="text-end">
                <button
                    class="px-3 py-1.5 border bg-sky-200 text-gray-700 rounded-md duration-150 hover:duration-150 hover:bg-sky-300"
                >
                    Join
                </button>
            </div>
        </div>
        <div>
            <div>
                <img src="/" v-if="hasImage" />
            </div>
            <div>모임소개글 예시입니다. ㅎㅎ 모임소개글 예시입니다.</div>
        </div>
    </div>
</template>
