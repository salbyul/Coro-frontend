<script setup>
import { onBeforeMount, ref } from 'vue';
import {
    fetchMoimMember,
    updateMoimMember,
    deportMember,
} from '../../api/moim';
import { useRoute } from 'vue-router';
import {
    initMemberList,
    memberList,
    getMoimMemberObject,
} from '../../composables/memberManagement/useHandlingMemberRole';

const route = useRoute();
const moimId = route.params.id;
const role = ref('USER');

const deport = async (id) => {
    try {
        const data = await deportMember(moimId, id);
        alert('추방되었습니다.');
        window.location.reload();
    } catch (error) {}
};

const submit = async () => {
    try {
        const moimMemberList = getMoimMemberObject();
        if (moimMemberList === false) {
            return;
        }
        const data = await updateMoimMember(moimId, moimMemberList);
        alert('수정 되었습니다.');
        window.location.href = `/moim/${moimId}`;
    } catch (error) {}
};

onBeforeMount(async () => {
    try {
        const data = await fetchMoimMember(moimId);
        initMemberList(data.body.moimMemberList);
        role.value = data.body.role;
    } catch (error) {}
});
</script>
<template>
    <div class="my-10">
        <div
            class="w-5/12 mx-auto flex justify-around border-b pb-4 my-5"
            v-for="moimMember in memberList"
        >
            <span
                class="text-md border px-3 py-1 rounded-md"
                :class="
                    moimMember.role === 'LEADER'
                        ? 'text-red-400'
                        : moimMember.role === 'MANAGER'
                        ? 'text-blue-400'
                        : ''
                "
                >{{ moimMember.name }}</span
            >
            <select
                v-model="moimMember.role"
                class="border rounded-sm px-2"
                :disabled="moimMember.role === 'LEADER' && role === 'MANAGER'"
            >
                <option value="LEADER">모임장</option>
                <option value="MANAGER">관리자</option>
                <option value="USER">회원</option>
            </select>
            <button
                v-if="moimMember.role !== 'LEADER'"
                class="px-3 py-1.5 rounded-md text-gray-700 bg-red-200 duation-150 hover:duration-150 hover:bg-red-300"
                @click="() => deport(moimMember.id)"
            >
                추방
            </button>
        </div>
        <div class="my-10 flex justify-around mx-auto w-3/12">
            <button
                class="px-3 py-1.5 rounded-md text-gray-700 bg-sky-200 duration-150 hover:duration-150 hover:bg-sky-300"
                @click="submit"
            >
                완료
            </button>
            <button
                class="px-3 py-1.5 rounded-md text-gray-700 bg-red-200 duration-150 hover:duration-150 hover:bg-red-300"
            >
                취소
            </button>
        </div>
    </div>
</template>
