<script setup>
import { ref } from 'vue';
import {
    title,
    content,
    validateSchedule,
    init,
} from '../../composables/useHandlingSchedule';
import { registerSchedule } from '../../api/schedule';
import { useRoute } from 'vue-router';

const props = defineProps({
    show: Boolean,
    year: Number,
    month: Number,
    date: Number,
});
const route = useRoute();
const currentOption = ref('view');

const submitNewSchedule = async () => {
    const moimId = route.params.id;
    if (!validateSchedule()) {
        alert('제목은 필수입니다.');
        return;
    }
    try {
        const date = '' + props.year + '-' + props.month + '-' + props.date;
        const schedule = {
            title: title.value,
            content: content.value,
            date: new Date(date),
        };
        const response = await registerSchedule(moimId, schedule);
        console.log(response);
    } catch (error) {
        console.log(error);
        const code = error.response.data.code;
        if (code === '531') {
            alert('오늘 이전에 일정을 생성할 수 없습니다.');
        }
    }
};

const closeModal = () => {
    init();
    currentOption.value = 'view';
};
</script>
<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header text-center">
                    <slot name="header">
                        {{ props.month }}월 {{ props.date }}일
                    </slot>
                    <div class="text-center my-5">
                        <button
                            class="mr-5 px-1 border rounded-md bg-gray-50 duration-150 hover:duration-150 hover:bg-gray-100"
                            @click="() => (currentOption = 'write')"
                        >
                            일정 작성
                        </button>
                        <button
                            class="px-1 border rounded-md bg-gray-50 duration-150 hover:duration-150 hover:bg-gray-100"
                            @click="() => (currentOption = 'view')"
                        >
                            일정 보기
                        </button>
                    </div>
                </div>

                <div class="modal-body">
                    <div v-if="currentOption === 'view'">This is view</div>
                    <div v-else>
                        <div>
                            <input
                                type="text"
                                placeholder="일정 제목을 입력해주세요."
                                class="pl-2 border rounded-sm my-2"
                                v-model="title"
                            />
                            <textarea
                                placeholder="일정 내용을 입력해주세요."
                                class="resize-none pl-2 border rounded-sm my-2"
                                v-model="content"
                            ></textarea>
                        </div>
                        <button
                            class="px-3 py-1 bg-sky-100 rounded-md"
                            @click="submitNewSchedule"
                        >
                            저장
                        </button>
                    </div>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button
                            class="modal-default-button"
                            @click="
                                () => {
                                    closeModal();
                                    $emit('close');
                                }
                            "
                        >
                            닫기
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
