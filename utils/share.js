function share(res) {
    if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
    }
    return {
        title: '孙正&翟彬的婚礼请柬'
    }
}
export {share}
