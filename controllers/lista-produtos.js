import { produtoServices } from "../services/produto-servicos.js";
import { formatPrice } from "../formatterPrice.js";

const getProducts = (name, price, imageUrl, id) => {
    const card = document.createElement("div");

    const conteudo = `
    <div class="produto">
        <div class="container">
            <button class="buttonDelete" type="button">
                <img class="deleteImage" src="../assets/delete.png" alt="Deletar" />
            </button>

                <a href="../views/edit-product.html?id=${id}">
                
                <button class="buttonEdit" type="button">
                    <img class="editImage" src="../assets/edit.png" alt="Editar" />
                </button>
                
                </a>
        </div>

        <img src="${imageUrl}" alt="img">
        <h1 class="product-name"> ${name} </h1>
        <p class="preco"> ${formatPrice(price)} </p>
    </div>
    `;
    card.innerHTML = conteudo;
    card.dataset.id = id;
    return card;
};


const produtos = document.querySelector("[data-allProducts]");

produtos.addEventListener("click", async (evento) => {
    let deleteButton = evento.target.className === "deleteImage";
    if (deleteButton) {
        const produto = evento.target.closest("[data-id]");
        let id = produto.dataset.id;
        produtoServices
        .deleteProduto(id)
        .then((resposta) => {
            produto.remove();
            produto.log(resposta);
        })
        .catch((error) => console.log(error));
    }
});

const render = async () => {
    try {
        const listaProdutos = await produtoServices.listaProdutos();

        listaProdutos.forEach((produto) => {
            produtos.appendChild(
                getProducts(produto.name, produto.price, produto.imageUrl, produto.id)
            );
        });
    } catch (error) {
        console.log(error);
    }
};

render();