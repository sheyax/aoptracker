import Layout from "@/components/Layout";
import AOPdat from "@/AOPdat";
import ChartArea from "@/components/ChartArea";
import ChartBar from "@/components/ChartBar";
import {useState} from "react"

export default function Home() {
 const [days, setDays]= useState(100)

  const kpi = [];
  AOPdat?.forEach((data) => {
    const newData = {
      siteId: data.SiteId,
      projectBatch: data.ProjectBatch,
      towerCo: data.TowerCO,
      coloId: data.ColoId,
      longitude: data.Longitude,
      latitude: data.Latitude,
      address: data.SiteAddressddress,
      sbc: data.SBC,
      statusRAN: data.RANStatus,
      statusTX: data.TxStatus,
      siteStatus: data.SiteCStatus,
      installation: data.actualInstallation,
      integration: data.actualIntegration,
      mapa2g: data.mapa2G,
      mapa3g: data.mapa3G,
      mapaLte: data.mapaLTE,
    };
    kpi.push(newData);
  });

  //get daily integration
  const IntegrationKpi = [];
  kpi.forEach((site) => {
    const date = site.integration;
    const instdate= site.installation;
    let foundDate = IntegrationKpi.find((kpi) => kpi.date === date);
    let instDate= IntegrationKpi.find((kpi)=>kpi.date === instdate)
    if (foundDate && instDate) {
      foundDate.integration += 1;
      instDate.installation +=1
    }else if(instDate && !foundDate){
    instDate.installation +=1
    }else if(!instDate && foundDate){
    foundDate.integration += 1;
    }
    else {
      IntegrationKpi.push({
        date: date,
        integration: 1,
        installation:1
      });
    }
  });

  //sbc Performance
  const sbcKpi = [];
  const sbcPerformance = (sites) => {
    const sbcs = {};
    sites.forEach((site) => {
      if (!sbcs[site.sbc]) {
        sbcs[site.sbc] = {
          performance: 0,
        };
      }

      if (site.siteStatus === "Integrated") {
        sbcs[site.sbc].performance++;
      }
    });

    Object.keys(sbcs).forEach((sbct) => {
      sbcKpi.push({
        sbcName: sbct,
        performance: sbcs[sbct].performance,
      });
    });
  };

  sbcPerformance(kpi);
  
  console.log(IntegrationKpi)

  return (
    <Layout>
      <h1>AOP Online Tracker </h1>
<input type="number" value={days} onChange={(e)=> setDays(e.target.value)}/>
      <ChartArea title={`integration KPI last ${days} days`} dataChart={IntegrationKpi} days={days} />
      <ChartBar title="SBC Performance" data={sbcKpi} />
    </Layout>
  );
}
