export default async (req, res) => {
    try {
    const igpm = await fetch("http://www.ipeadata.gov.br/api/odata4/Metadados('IGP_IGPMG')/Valores")
    const json = await igpm.json()
      return res.json(json);
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
  };