import api from "../api/axiosConfig";

// ================= GET BOOKS =================

export const getBooks = async (
    page = 0,
    size = 10,
    sortBy = "title",
    direction = "asc"
) => {

    const response = await api.get("/books", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });

    return response.data;

};

// ================= ADD BOOK =================

export const addBook = async (book) => {

    const response = await api.post("/books", book);

    return response.data;

};

// ================= UPDATE BOOK =================

export const updateBook = async (id, book) => {

    const response = await api.put(`/books/${id}`, book);

    return response.data;

};

// ================= DELETE BOOK =================

export const deleteBook = async (id) => {

    await api.delete(`/books/${id}`);

};

// ================= SEARCH BOOKS =================

export const searchBooks = async (
    keyword,
    page = 0,
    size = 10,
    sortBy = "title",
    direction = "asc"
) => {

    const response = await api.get("/books/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction
        }
    });

    return response.data;

};

// ================= FILTER BOOKS =================

export const filterBooks = async (
    keyword = "",
    category = "",
    publisher = "",
    active = true,
    page = 0,
    size = 10,
    sortBy = "title",
    direction = "asc"
) => {

    const response = await api.get("/books/filter", {
        params: {
            keyword,
            category,
            publisher,
            active,
            page,
            size,
            sortBy,
            direction
        }
    });

    return response.data;

};
export const uploadBookCover = async (bookId, file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(

        `/books/${bookId}/upload-cover`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};
export const getAllBooks = async () => {

    const response = await api.get("/books", {
        params: {
            page: 0,
            size: 1000,
            sortBy: "title",
            direction: "asc"
        }
    });

    return response.data.content;

};