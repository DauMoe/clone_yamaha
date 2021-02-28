var optanonIds = {
    'at': '8c9e3637-88d7-49e0-adf0-382e74d79cb3',
    'ch': 'b9ff8b23-bc53-4ee7-8ee5-b37c9ca00f0a',
    'cz': '6a29db45-1f33-4c5e-b9fc-0156f1423100',
    'de': 'a52b16a7-2310-4846-a45d-fec0484ef366',
    'dk': '9e5eb540-259a-412c-aaa1-38166c98eef5',
    'es': '84db37e2-e04e-42c7-92f3-9203534d40d8',
'europe': '06740f3b-0fac-4a2e-8a9e-19fd99d873d5',
    'fi': '3c6fb95b-9249-442a-a613-7847bf92fc43',
    'fr': '380ee834-a3b0-4ebf-9844-482d681d70f6',
    'hu': '44727380-18ba-4aa1-96ae-c7966c4aeda3',
    'it': '2a751151-79ba-4fa0-9ddb-5013b894b168',
    'nl': '73da54c2-ce83-4917-bc14-cb9da0f811aa',
    'no': '89fc6e79-6416-425f-8e59-6951cfa99136',
    'pl': '81b4342d-7d3c-4460-a702-34ee8f6d2d53',
    'pt': '234d2723-e623-4232-b18f-0d68b5041290',
    'ro': '13c60aab-73ea-4d51-9082-e7764b2b9c2a',
    'se': '78107aa5-f04e-4599-b8ad-48287c290a87',
    'tr': '85239e38-fffe-4202-9bc0-79558a290b9f',
    'uk': 'a0c24c98-c1d7-438e-8b36-2e3b3747e425'
}
var staging = (window.location.hostname.indexOf('staging.gcms.aws.infosys.yamaha.com') > -1)
var hostname = (window.location.hostname.substr(0,window.location.hostname.indexOf((staging)?'-':'.')))
if (hostname in optanonIds) {
    var optanonId = optanonIds[hostname] + (staging?'-test':'')
    var autoblockscript = document.createElement('script')
    var script = document.createElement('script')
    autoblockscript.type = 'text/javascript'
    autoblockscript.src = 'https://cdn.cookielaw.org/consent/' + optanonId + '/OtAutoBlock.js'
    autoblockscript.charset = 'UTF-8'
    script.type = 'text/javascript'
    script.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
    script.data_document_language = true
    script.setAttribute('data-document-language', true)
    script.charset = 'UTF-8'
    script.setAttribute('data-domain-script', optanonId)

    document.getElementsByTagName('head')[0].appendChild(autoblockscript)
    document.getElementsByTagName('head')[0].appendChild(script)

    function OptanonWrapper() {}
}
