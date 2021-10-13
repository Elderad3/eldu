export default async (req, res) => {
    try {
    const arrecadacao = await fetch("http://www.ipeadata.gov.br/api/odata4/Metadados('SRF12_TOTGER12')/Valores")
    const json = await arrecadacao.json()
      return res.json(json);
  } catch (error) {
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
  };