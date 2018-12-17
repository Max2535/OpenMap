import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import FormData from "./FormData";
import MapAdmin from "./MapAdmin";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (<MapAdmin/>
     /* <div className="container">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="col-sm-12">
          <div className="docSearch-content col-md-9 order-md-1">
            <FormData />
          </div>
        </div>
        <div className="footer">
          <div class="container">
            <div class="row">
              <div class="text-center col">
                <p class="social">
                  <iframe
                    src="https://ghbtns.com/github-btn.html?user=reactstrap&amp;repo=reactstrap&amp;type=star&amp;count=true"
                    frameborder="0"
                    scrolling="0"
                    width="100"
                    height="20px"
                  />
                  <iframe
                    src="https://ghbtns.com/github-btn.html?user=reactstrap&amp;repo=reactstrap&amp;type=fork&amp;count=true"
                    frameborder="0"
                    scrolling="0"
                    width="100"
                    height="20px"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>*/
    );
  }
}
