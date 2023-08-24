"use strict";
function stringChineseToNumber(content) {
    const reg = /([零]|[一二三四五六七八九]+)/g;
    const dic = {
        零: 0,
        一: 1,
        二: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9,
        十: "0",
        百: "00",
        千: "000",
        万: "0000",
        亿: "00000000",
        兆: "000000000000",
    };
    const getMinZero = (content, addContent) => {
        let [str, ua, ub, uc] = content.match(/([千万亿])(零[^零十百千万亿])([十百千万]{0,1})/) || [];
        const obj = {
            千万: "零零",
            千: "零零",
            千十: "零",
            万: "零零零",
            万十: "零零",
            万百: "零",
            亿万: "零零零",
            亿: "零零零",
            亿十: "零零",
            亿百: "零",
        };
        return content.replace("零", obj[ua + uc] + (addContent || ""));
    };
    const geZero = (content) => {
        const [u0] = content.match(/([亿])零[^万]+([万])/) || [];
        if (u0) {
            content = content.replace(u0, getMinZero(u0));
        }
        return content.replace(/([千万亿])(零[^十百千万亿])([十百千万]{0,1})/g, (str) => {
            let addContent = "";
            if (/亿/.test(str)) {
                if (u0)
                    return str;
                addContent = "零零零零";
            }
            return getMinZero(str, addContent);
        });
    };
    const c = content;
    // 处理10-19的问题
    if (/^十/.test(content)) {
        content = "一" + content;
    }
    // 处理连续零的问题
    content = geZero(content);
    // 处理单位直接结尾
    content = content.replace(/[十百千万亿]$/, (str) => {
        return str + dic[str].replace(/0/g, "零");
    });
    // 开始替换数字
    const keys = Array.from(content.match(reg) || []);
    return keys.map((key) => dic[key]).join('');
}
(() => {
    [
        "零",
        "一",
        "二",
        "八",
        "九",
        "十",
        "十一",
        "十二",
        "十八",
        "十九",
        "二十",
        "二十一",
        "二十二",
        "二十八",
        "二十九",
        "三十",
        "四十",
        "五十",
        "六十",
        "七十",
        "八十",
        "九十",
        "九十九",
        "一百",
        "一百零一",
        "一百零二",
        "一百零三",
        "一百零四",
        "一百零五",
        "一百零六",
        "一百零七",
        "一百零八",
        "一百零九",
        "一百一十",
        "一百一十一",
        "一百一十二",
        "一百一十三",
        "一百一十四",
        "一百一十五",
        "一百一十六",
        "一百一十七",
        "一百一十八",
        "一百一十九",
        "一百二十",
        "一百二十一",
        "一百二十二",
        "一百二十三",
        "一百二十四",
        "一百二十五",
        "一百二十六",
        "一百二十七",
        "一百二十八",
        "一百二十九",
        "一百三十",
        "一百四十",
        "一百五十",
        "一百六十",
        "一百七十",
        "一百八十",
        "一百九十",
        "一百九十九",
        "二百",
        "三百",
        "四百",
        "五百",
        "六百",
        "七百",
        "八百",
        "九百",
        "九百九十九",
        "一千",
        "一千零一",
        "一千零一十",
        "一千零一十一",
        "一千一百",
        "一千一百一十",
        "一千一百一十一",
        "一万零一",
        "九亿九千九百九十九万九千零一十二",
        "九千九百零五万九千九百九十九亿九千九百九十九万九千零一十二",
        "九千九百九十九万九千零一十二亿九千九百九十九万九千零一十二",
        "九千九百零五万九千九百九十九亿九千九百零五万九千九百九十九",
        "九千零五万九千九百零九亿九千零五万",
        "九千零五万九千九百零九亿零五万",
        "九千九百零五兆九千九百零九亿九千九百零五万",
    ].map((content) => {
        console.log(content, stringChineseToNumber(content));
    });
})();