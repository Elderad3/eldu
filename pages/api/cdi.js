export default async (req, res) => {
    try {
    const cdi = await fetch("http://www.ipeadata.gov.br/api/odata4/Metadados('BM12_TJCDI12')/Valores")
    const json = await cdi.json()
      return res.json(json);
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
  };