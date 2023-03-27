import React, { useCallback, useMemo, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { CarUsers } from './CarUsers'

export function CarsTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  return (
    <div className='carsList'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </div>
  )
}

export function CarsList({ data }) {
    const [selectedCar, setSelectedCar] = useState(undefined)
    const items = data.reduce((acc, curr) => {
        const isPresent = acc.find((i) => i.model === curr.vehicle.model);
        if(!isPresent) {
            acc.push({ model: curr.vehicle.model, maker: curr.vehicle.maker })
        }
        return acc;
    }, []);

    const columns = useMemo(() => ([
        {
            Header: 'Vehicle Model',
            id: 'vehicleName',
            accessor: (d) => d.model,
            Cell: ({ value }) => <span className='clickable' onClick={() => setSelectedCar(value)} >{value}</span>
        },
        {
            Header: 'Vehicle Maker',
            id: 'vehicleMaker',
            accessor: (d) => d.maker
        }
    ]), []);

    const onDismiss = useCallback(() => {
        setSelectedCar(undefined);
    }, []);
    return (
        <div className='cars'>
            <h3>Cars List</h3>
            <CarsTable data={items} columns={columns} />
            {selectedCar && <CarUsers data={data} model={selectedCar} onDismiss={onDismiss} />}
        </div>
    )
}