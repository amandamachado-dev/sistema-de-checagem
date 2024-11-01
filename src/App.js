import React, { useState } from 'react';
import './styles.css'; // Importando o arquivo CSS atualizado

const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Formulário 02a',
      fields: [
        { id: 1.1, name: 'Nome', status: '' },
        { id: 1.2, name: 'Endereço', status: '' },
        { id: 1.3, name: 'Nome Abreviado', status: '' },
        { id: 1.4, name: 'Assinatura', status: '' }
      ]
    },
    {
      id: 2,
      name: 'Formulário 10a',
      fields: [
        { id: 2.1, name: 'Foto 3x4', status: '' },
        { id: 2.2, name: 'Digital do Polegar', status: '' },
        { id: 2.3, name: 'Assinatura igual ao RG ou CNH', status: '' }
      ]
    },
    { id: 3, name: 'Cópia do comprovante de pagamento da taxa de inscrição', status: '' },
    { id: 4, name: 'Cópia do RG ou CNH', status: '' },
    { id: 5, name: 'Cópia do CPF (se não constar no RG)', status: '' },
    { id: 6, name: 'Cópia do certificado de reservista (para homens de 18 a 45 anos)', status: '' },
    { id: 7, name: 'Cópia frente e verso do diploma de conclusão do curso de TTI', status: '' },
    { id: 8, name: 'Autenticidade do diploma: Sistec ou GDAE', status: '' },
    { id: 9, name: 'Portaria COFECI', status: '' },
    { id: 10, name: 'Inscrição em outro CRECI', status: '' },
  ]);

  const [reportText, setReportText] = useState('');

  const handleFieldChange = (itemId, fieldId, status) => {
    setItems(items.map(item =>
      item.id === itemId
        ? {
            ...item,
            fields: item.fields.map(field =>
              field.id === fieldId ? { ...field, status: status } : field
            )
          }
        : item
    ));
  };

  const handleStatusChange = (id, status) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, status: status } : item
    ));
  };

  const generateReport = () => {
    let report = '';

    items.forEach(item => {
      const exigencias = [];

      if (item.fields) {
        item.fields.forEach(field => {
          if (field.status === 'exigencia' || field.status === 'indeferido') {
            if (item.id === 1) {
              // Formulário 02a
              switch (field.id) {
                case 1.1:
                  exigencias.push(' * Nome: Preencha nome completo conforme documento apresentado.');
                  break;
                case 1.2:
                  exigencias.push(' * Endereço: Preencha o endereço completo incluindo número e complemento caso possua. Deve ser do estado de São Paulo.');
                  break;
                case 1.3:
                  exigencias.push(' * Nome Abreviado (indeferido): O nome abreviado escolhido não poderá ser registrado por já constar igual registrado OU por estar em desconformidade com a Resolução vigente. Caso queira, poderá enviar outra opção para analisarmos - esse trâmite é opcional.');
                  break;
                case 1.4:
                  exigencias.push(' * Assinatura: Envie assinatura manual idêntica à utilizada no RG ou CNH apresentado.');
                  break;
              }
            } else if (item.id === 2) {
              switch (field.id) {
                case 2.1:
                  exigencias.push(' * Envie foto 3x4 padrão de documento com fundo branco, boa qualidade na imagem / NÍTIDA.');
                  break;
                case 2.2:
                  exigencias.push(' * Envie Digital do polegar com boa qualidade na imagem / NÍTIDA.');
                  break;
                case 2.3:
                  exigencias.push(' * Envie com assinatura manual idêntica à utilizada no RG ou CNH apresentado.');
                  break;
                default:
                  exigencias.push(` * ${field.name}`);
              }
            }
          }
        });
        if (exigencias.length > 0) {
          report += `- ${item.name}:\n${exigencias.join('\n')}\n\n`;
        }
      } else if (item.status === 'exigencia' || item.status === 'indeferido') {
        // Exigências para IDs de 3 a 10
        switch (item.id) {
          case 3:
            report += `- Envie o comprovante de pagamento com todas as informações legíveis.\n`;
            break;
          case 4:
            report += `- Envie frente e verso legível do RG ou CNH.\n`;
            break;
          case 5:
            report += `- Envie o CPF caso não esteja presente no documento de identidade.\n`;
            break;
          case 6:
            report += `- Envie o certificado de reservista/ CDI (para homens de 18 a 45 anos).\n`;
            break;
          case 7:
            report += `- Envie o diploma de conclusão do curso de Técnico em Transações Imobiliárias (TTI).\n`;
            break;
          case 8:
            report += `- Envie um comprovante de autenticidade do diploma via Sistec ou GDAE.\n`;
            break;
          case 9:
            report += `- Portaria COFECI: Entre em contato com a Instituição de Ensino para obtenção de Portaria de autorização atualizada.\n`;
            break;
          case 10:
            report += `- Inscrição em outro CRECI: Caso tenha registro em outro estado, envie o comprovante da inscrição em outro CRECI.\n`;
            break;
          default:
            report += `- ${item.name}\n`;
        }
      }
    });

    if (report) {
      setReportText(`Prezado(a),\nSeu pedido foi analisado. Para prosseguir, apresente os seguintes itens:\n\n${report}\nEnvie os itens em PDF para o e-mail certidoes.secretaria@crecisp.gov.br\n\nO não cumprimento em 30 dias acarretará o arquivamento do processo.\n\nCordialmente,\nSEFIS | CRECISP`);
    } else {
      setReportText('Recebemos seu pedido de inscrição Principal. Estamos analisando, por gentileza aguarde.');
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="form-title">PRÉ-ANÁLISE - SEFIS</h1>
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className="item">
              {item.name}
              {item.fields ? (
                <ul className="field-list">
                  {item.fields.map(field => (
                    <li key={field.id} className="field-item">
                      {field.name}
                      <select
                        value={field.status}
                        onChange={(e) => handleFieldChange(item.id, field.id, e.target.value)}
                        className="select-field"
                      >
                        {field.id === 1.3 ? (
                          <>
                            <option value="">Selecione</option>
                            <option value="deferido">Deferido</option>
                            <option value="indeferido">Indeferido</option>
                          </>
                        ) : (
                          <>
                            <option value="">Selecione</option>
                            <option value="ok">OK</option>
                            <option value="exigencia">Exigência</option>
                          </>
                        )}
                      </select>
                    </li>
                  ))}
                </ul>
              ) : (
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="select-field"
                >
                  <option value="">Selecione</option>
                  <option value="ok">OK</option>
                  <option value="exigencia">Exigência</option>
                </select>
              )}
            </li>
          ))}
        </ul>
        <button className="generate-button" onClick={generateReport}>
          Gerar Ofício
        </button>
      </div>
      <div className="report-container">
        <h2 className="report-title">OFÍCIO:</h2>
        <textarea
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          className="report-textarea"
        />
      </div>
    </div>
  );
};

export default App;
