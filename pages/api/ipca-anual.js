export default async (req, res) => {
    try {
    const ipca = await fetch("http://www.ipeadata.gov.br/api/odata4/Metadados('PRECOS_IPCAG')/Valores")
    const json = await ipca.json()
      return res.json(json);
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
  };