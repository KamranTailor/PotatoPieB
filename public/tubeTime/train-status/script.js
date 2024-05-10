async function onStart() {
    const responce = await fetch("/app-tfl/tfl-status");
    const data = await responce.json();
    console.log(data)

    const dataTUBE = data.tubeData;
    const dataEL = data.elizabethData
    const dataOVR = data.overgroundData;
    const dataTRM = data.tramData;
    const dataDLR = data.dlrData;
    const currentTime = new Date();
    const timestamp = currentTime.toLocaleString(); // Convert the date to a string in a local time format

    const toSet = `Last Updated ${timestamp} <br>
    <div id="bkls" class="cop" onclick="extraInfo('bkl')"> Bakerloo: <br> ${dataTUBE[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="cnts" class="cop" onclick="extraInfo('cnt')"> Central: <br> ${dataTUBE[1]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="crls" class="cop" onclick="extraInfo('cir')"> Circle: <br> ${dataTUBE[2]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="diss" class="cop" onclick="extraInfo('dis')"> District: <br> ${dataTUBE[3]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="h_cs" class="cop" onclick="extraInfo('ham')"> Hammersmith & City: <br> ${dataTUBE[4]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="jues" class="cop" onclick="extraInfo('jul')"> Jubilee: <br> ${dataTUBE[5]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="mets" class="cop" onclick="extraInfo('met')"> Metropolitan: <br> ${dataTUBE[6]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="nors" class="cop" onclick="extraInfo('nor')"> Northern: <br> ${dataTUBE[7]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="pics" class="cop" onclick="extraInfo('pic')"> Piccadilly: <br> ${dataTUBE[8]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="vics" class="cop" onclick="extraInfo('vic')"> Victoria: <br> ${dataTUBE[9]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="w_cs" class="cop" onclick="extraInfo('wac')"> Waterloo & City: <br> ${dataTUBE[10]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="ells" class="cop" onclick="extraInfo('dataEL')"> Elizabeth Line: <br> ${dataEL[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="dlrs" class="cop" onclick="extraInfo('dlr')"> Docklands Light Railway: <br> ${dataDLR[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="lnos" class="cop" onclick="extraInfo('log')"> London Overground: <br> ${dataOVR[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    <div id="trms" class="cop" onclick="extraInfo('trm')"> Trams: <br> ${dataTRM[0]["lineStatuses"][0]["statusSeverityDescription"]}</div>
    `

    document.getElementById("content").innerHTML= toSet;
}

onStart()