// import React from 'react';
// import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

// import { employeesData, employeesGrid } from '../data/dummy';
// import { Header } from '../components';

// const Employees = () => {
//   const toolbarOptions = ['Search'];

//   const editing = { allowDeleting: true, allowEditing: true };

//   return (
//     <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//       <Header category="Page" title="Employees" />
//       <GridComponent
//         dataSource={employeesData}
//         width="auto"
//         allowPaging
//         allowSorting
//         pageSettings={{ pageCount: 5 }}
//         editSettings={editing}
//         toolbar={toolbarOptions}
//       >
//         <ColumnsDirective>
//           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//           {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
//         </ColumnsDirective>
//         <Inject services={[Search, Page]} />

//       </GridComponent>
//     </div>
//   );
// };
// export default Employees;



import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Accounts() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Accounts;