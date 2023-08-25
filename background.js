let allowHosts = [ // request with proxy
    'linkedin.com',
    'www.linkedin.com',
    'whatismyipaddress.com'
].join(',');
let bypassList = [ // request without proxy
    // 'whatismyipaddress.com'
].join(',');

// [
//     'workana.com',
//     'peopleperhour.com',
//     'payoneer.com',
//     'crowdworks.jp',
//     'web.skype.com',
//     'skype.com',
//     'slack.com',
//     'mail.google.com',
//     'whoer.net',
//     'long.live.com',
//     'linkedin.com',
//     'whatismyipaddress.com'
// ].forEach(v => {
//     if (allowHosts == '') {
//         allowHosts = `(host).indexOf('${v}') != -1`;
//     } else {
//         allowHosts += `|| (host).indexOf('${v}') != -1`;
//     }
// });
var config = {
    mode: "fixed_servers",
    rules: {
      proxyForHttp: {
        scheme: "http",
        host: "178.238.228.102",
        port: '27017'
      },
    //   bypassList: bypassList
    }
};

// chrome.proxy.settings.set(
//     {value: config, scope: 'regular'},
//     function() {}
// );
chrome.proxy.settings.set({
    value: {
        mode: "pac_script",
        pacScript: {
            data: `
                function FindProxyForURL(url, host) {
                    if("${bypassList}".indexOf(host) > -1)
                        return 'DIRECT';
                    else if("${allowHosts}".indexOf(host) > -1)
                        return 'PROXY 178.238.228.102:27017';
                    else {
                        return 'DIRECT';
                    }
                }
            `
        },
    },
    scope: 'regular'
}, function () { });

chrome.proxy.onProxyError.addListener((err) => {
    console.log('err: ', err)
})

// chrome.webRequest.onAuthRequired.addListener(function (details, callbackFn) {
//     if (details.isProxy == true) {
//         callbackFn({
//             authCredentials: {
//                 username: 'root',
//                 password: 'albona'
//             }
//         });
//     }
// }, {
//     urls: ["<all_urls>"]
// }, ['asyncBlocking']);