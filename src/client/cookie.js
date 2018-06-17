class Cookie {
    set(name, value, expire) {
        let date = new Date()
        date.setSeconds(date.getSeconds() + expire)
        document.cookie = name + "=" + escape(value) + "; expires=" + date.toGMTString()
        console.log(document.cookie)
    }
    get(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + "=")
            if (start != -1) {
                start = start + name.length + 1
                let end = document.cookie.indexOf(";", start)
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(start, end))
            }
        }
        return ""
    }
    delete(name) {
        this.set(name, "", -1)
    }
}

export default new Cookie()