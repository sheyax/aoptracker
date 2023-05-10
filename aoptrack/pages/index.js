import Layout from "@/components/Layout";
import AOPdat from "@/AOPdat";
import ChartArea from "@/components/ChartArea";
import ChartBar from "@/components/ChartBar";

export default function Home() {
  console.log(AOPdat);

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
    let foundDate = IntegrationKpi.find((kpi) => kpi.date === date);
    if (foundDate) {
      foundDate.index += 1;
    } else {
      IntegrationKpi.push({
        date: date,
        index: 1,
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

  return (
    <Layout>
      <h1>AOP Online Tracker </h1>

      <ChartArea title="integration KPI" dataChart={IntegrationKpi} />
      <ChartBar title="SBC Performance" data={sbcKpi} />
    </Layout>
  );
}
