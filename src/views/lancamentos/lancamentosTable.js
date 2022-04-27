import React from 'react';
import currencyFormatter from 'currency-formatter';

export default (props) => {
  const rows = props.lancamentos.map((lancamento, index) => {
    return (
      <tr key={index}>
        <td key={index + 0}>{lancamento.descricao}</td>
        <td key={index + 1}>
          {currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}
        </td>
        <td key={index + 2}>{lancamento.tipo}</td>
        <td key={index + 3}>{lancamento.mes}</td>
        <td key={index + 4}>{lancamento.status}</td>
        <td key={index + 5}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => props.editAction(lancamento.id)}
          >
            Editar
          </button>
          <button
            style={{ marginLeft: '4px' }}
            type="button"
            className="btn btn-danger"
            onClick={(e) => props.deleteAction(lancamento)}
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
