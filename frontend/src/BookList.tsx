import { useEffect, useState } from "react";
import type { Book } from './types/Book';

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("asc");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortOrder]);

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
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <nav>
                    <ul className="pagination mb-0">
                        <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>Previous</button>
                        </li>
                        {[...Array(totalPages)].map((_, i) =>
                            <li className={`page-item ${pageNum === i + 1 ? 'active' : ''}`} key={i + 1}>
                                <button className="page-link" onClick={() => setPageNum(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        )}
                        <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>

                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="pageSize" className="form-label mb-0">Results per page:</label>
                    <select
                        id="pageSize"
                        className="form-select form-select-sm"
                        style={{ width: 'auto' }}
                        value={pageSize}
                        onChange={(p) => { setPageSize(Number(p.target.value)); setPageNum(1); }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default BookList