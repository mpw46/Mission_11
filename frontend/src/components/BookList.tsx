import { useEffect, useState } from "react";
import type { Book } from '../types/Book';
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";


function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((cat) => `categories=${encodeURIComponent(cat)}`).join('&');

            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]);

    return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Book List</h1>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => { setSortOrder(sortOrder === "asc" ? "desc" : "asc"); setPageNum(1); }}
                >
                    Sort by Title: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
                {books.map((b) =>
                    <div className="col" key={b.bookID}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{b.title}</h5>
                                <h6 className="card-subtitle mb-3 text-muted">{b.author}</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Publisher:</strong> {b.publisher}</li>
                                    <li className="list-group-item"><strong>ISBN:</strong> {b.isbn}</li>
                                    <li className="list-group-item"><strong>Classification:</strong> {b.classification}</li>
                                    <li className="list-group-item"><strong>Category:</strong> {b.category}</li>
                                    <li className="list-group-item"><strong>Pages:</strong> {b.pageCount}</li>
                                    <li className="list-group-item"><strong>Price:</strong> ${b.price}</li>
                                </ul>

                                <button className="btn btn-success" onClick={() => navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)}>Buy</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </>
    )
}

export default BookList