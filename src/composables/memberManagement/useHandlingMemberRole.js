import { ref } from 'vue';

export const memberList = ref([]);

export const initMemberList = (list) => {
    const newList = [];
    for (let i = 0; i < list.length; i++) {
        const member = list.at(i);
        newList.push({
            id: member.id,
            name: member.memberName,
            role: ref(member.role),
        });
    }
    memberList.value = newList;
};

const validate = () => {
    const leaderList = memberList.value.filter(
        (moimMember) => moimMember.role === 'LEADER'
    );
    if (leaderList.length !== 1) {
        return false;
    }
    return true;
};

export const getMoimMemberObject = () => {
    if (!validate()) {
        alert('한 명의 모임장이 존재해야 합니다.');
        return false;
    }
    return memberList.value.map((moimMember) => {
        return {
            id: moimMember.id,
            memberName: moimMember.name,
            role: moimMember.role,
        };
    });
};
