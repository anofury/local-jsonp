// 监听点击事件
document.addEventListener("DOMContentLoaded", function () {
    window.lis = [].slice.call(document.querySelectorAll('.action-list>li')).slice(1)
    window.content = document.querySelector('.action-content')
    window.lis.forEach(element => {
        element.onclick = function () { switchTo(element, parseInt(element.dataset.kind)) }
    })

    // 初始化温度
    getExampleData('./example_data/temperature.json')
})

// 切换
function switchTo(element, kind) {
    if (element.className.indexOf('active') === -1) {
        toggleClass(element)
        toggleTable(kind)
    }
}

// 切换类
function toggleClass(element) {
    window.lis.forEach(element => {
        element.className = element.className.replace('active', '')
    })
    element.className += ' active'
    element.className = element.className.replace(/(^\s+)|(\s+$)/g, '').replace(/(\s\1+)/g, ' ')
}

// 切换表格内容
function toggleTable(kind = 0) {
    switch (kind) {
        case 0: // 点击温度
            getExampleData('./example_data/temperature.json')
            break
        case 1: // 点击压力
            getExampleData('./example_data/pressure.json')
            break
    }
}

// 获取本地测试数据
// 本方法只适用请求本地 json 文件
function getExampleData(url) {
    window.script = document.createElement('script')
    // ?callback=Data 指定回调函数为 Data
    window.script.src = url + '?callback=Data'
    document.body.append(window.script)
}

// 渲染表格到 html 中
// 本方法只适用请求本地 json 文件
function Data(response) {
    var h2 = `<h2>${response.name}</h2>`,
        contentTable = content => `<div class="content-table">${content}</div>`,
        table = content => `<table><tbody>${content}</tbody></table>`,
        tr = content => `<tr>${content}</tr>`,
        th = content => `<th>${content}</th>`,
        td = content => `<td>${content}</td>`,
        innerHTML = tr(th('编号') + th(response.name) + th('备注'))
    response.data.forEach((value, index) => {
        innerHTML += tr(td(index + 1) + td(value.value) + td(value.mark))
    })
    window.content.innerHTML = h2 + contentTable(table(innerHTML))
    document.body.removeChild(window.script)
    window.script = null
}