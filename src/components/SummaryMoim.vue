<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps(['moim']);
const introduction = ref('');
const params = new URLSearchParams(location.search);

const moveMoimDetail = () => {
    let path = `/moim/${props.moim.id}`;
    if (params.has('option') && params.has('value')) {
        path += `?option=${params.get('option')}&value=${params.get('value')}`;
    }
    window.location.href = path;
};

const moveSearchByTag = (tag) => {
    window.location.href = `/search?option=tag&value=${tag}`;
};

onMounted(() => {
    if (props.moim.introduction.length > 100) {
        introduction.value = props.moim.introduction.substring(0, 100) + '...';
    } else {
        introduction.value = props.moim.introduction;
    }
});
</script>
<template>
    <div
        class="mx-auto p-2 w-7/12 border border-gray-400 rounded-lg my-10 duration-150 hover:duration-150 hover:bg-gray-50"
    >
        <div class="hover:cursor-pointer" @click="moveMoimDetail">
            <div class="text-xl text-center">
                {{ moim.name }}
            </div>
            <div>
                <img
                    v-if="moim.photo !== null"
                    v-bind:src="`data:image/png;base64,${moim.photo}`"
                    alt="image"
                    class="mx-auto"
                />
                <img
                    v-if="moim.photo === null"
                    src="/defaultMoimPhoto.jpg"
                    alt="image"
                    class="mx-auto"
                />
            </div>
            <div class="text-sm my-2 text-gray-700">
                {{ introduction }}
            </div>
        </div>
        <div class="text-xs my-1 text-gray-600">{{ moim.moimType }}</div>
        <div>
            <span
                v-for="tag in moim.tagList"
                class="text-sm mx-2 bg-gray-100 text-gray-700 p-1 rounded-md duration-150 hover:cursor-pointer hover:duration-150 hover:bg-gray-200"
                @click="() => moveSearchByTag(tag)"
                ># {{ tag }}</span
            >
        </div>
    </div>
</template>
