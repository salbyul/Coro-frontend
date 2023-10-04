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
    newList.sort((a, b) => {
        if (a.role.value === b.role.value) {
            return 0;
        } else if (a.role.value === 'LEADER') {
            return -1;
        } else if (b.role.value === 'LEADER') {
            return 1;
        } else if (a.role.value === 'MANAGER') {
            return -1;
        } else {
            return 1;
        }
    });
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
