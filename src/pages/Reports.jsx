import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Reports.css'; 

const Reports = () => {
  return (
    <div>
      <Navbar style={{ backgroundColor: '#e3f2fd' }} expand="lg" className="mx-auto"> {/* Add mx-auto class */}
        <Navbar.Brand style={{ padding: '10px', borderRight: '1px solid #ccc' }}>

          Reports

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/Accountstatement" activeClassName="active" className="nav-link">
              Account Statement
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Accountbalance" activeClassName="active" className="nav-link">
              Account Balance
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Loanreport" activeClassName="active" className="nav-link">
              Loan Report
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Loandue" activeClassName="active" className="nav-link">
              Loan Due
            </Nav.Link>
            <Nav.Link as={NavLink} to="/TransactionReport" activeClassName="active" className="nav-link">
              Transaction
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ExpenseReport" activeClassName="active" className="nav-link">
              Expense
            </Nav.Link>
            <Nav.Link as={NavLink} to="/RevenueReport" activeClassName="active" className="nav-link">
              Revenue
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Reports;
