const ListOfJobs = ({ rows, handleDeleteRow, handleEditRow }) => {
  return (
    <div className="table__wrapper">
      <table className="table">
        <thead>
          <tr>
            <th align="left" colSpan={4}>
              Список мест работы
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Организация </td>
            <td>Год начала работы</td>
            <td>Год окончания работы</td>
            <td></td>
          </tr>

          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <div className="table__data">{row.organisation}</div>
                </td>
                <td>
                  <div className="table__data">{row.yearOfStart}</div>
                </td>
                <td>
                  <div className="table__data"> {row.yearOfEnd}</div>
                </td>
                <td>
                  <div className="table__actions">
                    <button onClick={() => handleDeleteRow(idx)}>
                      Удалить
                    </button>
                    <button onClick={() => handleEditRow(idx)}>Изменить</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfJobs;
