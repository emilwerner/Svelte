export let storage = {
    getList: () => {
        var theList = localStorage.getItem('theList');
        if (!theList || theList === 'undefined') {
            return [];
        }
        return JSON.parse(theList);

    },
    setList: (array) => {
        localStorage.setItem('theList', JSON.stringify(array));
    }
};