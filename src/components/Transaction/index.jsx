import { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CurrencyFormat from "react-currency-format";
import {
  ButtonGroup,
  FinalMessage,
  FormMessageError,
  Header,
  InputGroup,
  Modal,
  ModalContent,
  Strong,
  StyledForm,
  UserName,
} from "./Styleds";
import Connection from "../Connection";

class Transaction extends Component {
  state = {
    showModal: false,
    transactionStatus: "clear",
  };

  cards = [
    // valid card
    {
      card_number: "1111111111111111",
      cvv: 789,
      expiry_date: "01/18",
    },
    // invalid card
    {
      card_number: "4111111111111234",
      cvv: 123,
      expiry_date: "01/20",
    },
  ];

  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    if (!html.style.overflow || !body.style.overflow) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.scroll = "no";
      html.scroll = "no";
    } else {
      html.style.overflow = null;
      body.style.overflow = null;
      html.scroll = null;
      body.scroll = null;
    }
  };

  closeModal = () => {
    this.setState({ transactionStatus: "clear" });
    this.handleModal();
  };

  handleSubmit = async (values) => {
    const card = this.cards[values.card];

    try {
      // Card check to simulate a failure: 1=>fail, n=>pass
      if (values.card == 1) {
        this.setState({ transactionStatus: "fail" });
      } else {
        const payload = {
          card_number: card.card_number,
          cvv: card.cvv,
          expiry_date: card.expiry_date,
          destination_user_id: values.user,
          value: Number(values.value),
        };
        const conn = new Connection();
        const data = await conn.doTransaction(payload);
        if (data.success === true) {
          this.setState({ transactionStatus: "success" });
        } else {
          this.setState({ transactionStatus: "fail" });
        }
      }
    } catch (error) {
      console.log("handleSubmit", error);
    }
  };

  render() {
    const user = this.props.user;
    const cards = this.cards.map((card, index) => (
      <option key={index} value={index}>
        {" "}
        Cartão com final {card.card_number.slice(-4)}
      </option>
    ));
    const initialValues = {
      user: this.props.user.id,
      value: "",
      card: "",
    };
    const validationSchema = Yup.object({
      user: Yup.number().required(),
      value: Yup.number()
        .min(0.01, "Informe pelo menos um centavo")
        .required("Informe um valor")
        .transform((value, originaValue) =>
          Number(
            originaValue
              .replace("R$", "")
              .replaceAll(".", "")
              .replaceAll(",", ".")
          )
        ),
      card: Yup.number().required("Escolha um cartão"),
    });

    const renderFormError = (m) => {
      return <FormMessageError>{m}</FormMessageError>;
    }; // TODO: StyledError

    const renderByStatus = () => {
      if (this.state.transactionStatus === "success") {
        return (
          <>
            <Header>
              <h3>Recibo de pagamento</h3>
            </Header>
            <FinalMessage>O pagamento foi concluído com sucesso!</FinalMessage>
            <ButtonGroup>
              <button type="button" onClick={this.closeModal}>
                Sair
              </button>
            </ButtonGroup>
          </>
        );
      } else if (this.state.transactionStatus === "fail") {
        return (
          <>
            <Header>
              <h3>Recibo de pagamento</h3>
            </Header>
            <FinalMessage>
              O pagamento <Strong>não</Strong> foi concluído com sucesso!
            </FinalMessage>
            <ButtonGroup>
              <button type="button" onClick={this.closeModal}>
                Sair
              </button>
            </ButtonGroup>
          </>
        );
      }

      return (
        <>
          <Header>
            <h3>
              Pagamento para <UserName>{user.name}</UserName>
            </h3>
          </Header>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          >
            <Form>
              <StyledForm>
                <Field name="user" type="hidden" />
                <InputGroup>
                  <Field name="value" type="number" placeholder="R$ 0,00">
                    {({ field }) => (
                      <CurrencyFormat
                        {...field}
                        displayType={"input"}
                        prefix={"R$ "}
                        decimalSeparator={","}
                        thousandSeparator={"."}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="value" render={renderFormError} />
                </InputGroup>

                <InputGroup>
                  <Field name="card" as="select">
                    <option></option>
                    {cards}
                  </Field>
                  <ErrorMessage name="card" render={renderFormError} />
                </InputGroup>
                <ButtonGroup>
                  <button type="button" onClick={this.closeModal}>
                    Cancelar
                  </button>
                  <button type="submit">Pagar</button>
                </ButtonGroup>
              </StyledForm>
            </Form>
          </Formik>
        </>
      );
    };

    return (
      <>
        <div>
          <button onClick={this.handleModal}>Pagar</button>
        </div>
        <Modal show={this.state.showModal}>
          <ModalContent>{renderByStatus()}</ModalContent>
        </Modal>
      </>
    );
  }
}

export default Transaction;
