export const emailTemplate = (title, doi, link, citation) => {
  return `<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>EdTech Hub</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style type="text/css">
        a[x-apple-data-detectors] {
          color: inherit !important;
        }
  
        .status-list li::before {
          display: inline-block;
          width: 1em;
          font-weight: lighter;
          content: "\25CF";
          color: #ff5c00;
        }
  
        .status-list ul {
          padding: 0;
          overflow: hidden;
        }
  
        .status-list ul li {
          position: relative;
          left: -1em;
          display: inline;
          white-space: pre;
        }
  
        .status-list ul li.active {
          color: #ff5c00;
        }
  
        .status-list {
          margin-right: 15%;
          margin-left: 15%;
          padding: 0;
          text-align: center;
          display: inline-block;
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0">
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
      >
        <tr>
          <td style="padding: 20px 0 30px 0">
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-collapse: collapse; border: 1px solid #cccccc"
            >
              <tr>
                <td align="center" bgcolor="#fff" style="padding: 30px 0 30px 0">
                  <img
                    src="https://edtechhub.org/wp-content/uploads/2020/09/EdTechHub-Logo.png"
                    alt="Edtech Hub Logo."
                    width="300"
                    style="display: block"
                  />
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td style="color: #153643; font-family: Arial, sans-serif">
                        <h1 style="font-size: 24px; margin: 0">
                          Zotero-Zenodo record created
                        </h1>
                        <h3 style="font-size: 12px; margin: 0">${title}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          color: #153643;
                          font-family: Arial, sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          padding: 20px 0px 0px;
                        "
                      >
                        <h3 style="font-size: 16px; margin: 0">
                          DOI:
                          <span style="font-weight: 300"
                            >${doi}</span
                          >
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          color: #153643;
                          font-family: Arial, sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          padding: 0px 0px 29px;
                        "
                      >
                        <h3 style="font-size: 16px; margin: 0">
                          Evidence Library Link:
                          <span style="font-weight: 300"
                            ><a href="${link}">${link}</a></span
                          >
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          color: #153643;
                          font-family: Arial, sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        <p style="margin: 0">
                        ${citation}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#FF5C00" style="padding: 30px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          color: #ffffff;
                          font-family: Arial, sans-serif;
                          font-size: 14px;
                        "
                      >
                        <p style="margin: 0">
                          <a
                            style="color: #fff; text-decoration: none"
                            href="https://edtechhub.org/"
                            >EdTech Hub 2021</a
                          >
                          <br />
                          Creative Commons Attribution 4.0 International License.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-collapse: collapse; border: 0px solid #cccccc"
            >
              <tr style="border: 0px solid #fff">
                <td bgcolor="#ffffff" style="padding: 20px 30px 20px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          color: #153643;
                          font-family: Arial, sans-serif;
                          font-size: 12px;
                          line-height: 24px;
                          text-align: center;
                        "
                      >
                        <p style="margin: 0">
                          This email is sent automatically. By
                          <a
                            style="text-decoration: none; color: #ff5c00"
                            href="https://zotzen.edtechhub.org"
                            >zotzen.edtechhub.org</a
                          >
                          for more information.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
