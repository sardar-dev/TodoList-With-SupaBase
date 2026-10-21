let inp = document.querySelector("input");
let output = document.querySelector("ul");

let supabaseClient = supabase.createClient(
  "https://pxwymzzgjxidfxznxysy.supabase.co",
  "sb_publishable_b7K7hIfFfP8r3dK5W2G1lA_LHiuDVyI",
);

const getData = async () => {
  output.innerHTML = "";

  const response = await supabaseClient.from("todos").select("*");
  const todos = response.data;

  for (let i = 0; i < todos.length; i++) {
    output.innerHTML += `<li>${todos[i].title} <button onclick="deleteTodo(${todos[i].id})">delete</button> </li>`;
  }
};
getData();

const addTask = async (event) => {
  event.preventDefault();

  const title = inp.value;

  await supabaseClient.from("todos").insert({ title });

  getData();
  inp.value = "";
};

const deleteTodo = async (id) => {
  const response = await supabaseClient.from("todos").delete().eq("id", id);

  if (!response.error) {
    getData();
  }
};
