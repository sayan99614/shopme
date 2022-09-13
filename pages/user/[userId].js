import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: payload.data };
    default:
      return state;
  }
};

export default function UserId() {
  const router = useRouter();
  const userId = router.query.userId;
  const [{ loading, user, error }, dispatch] = useReducer(reducer, {
    loading: false,
    user: null,
    error: "",
  });

  useEffect(() => {
    let data;
    async function getUser() {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const res = await fetch(`/api/user/${userId}`);
        data = await res.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: "something went wrong" });
      }
    }
    if (userId) {
      getUser();
    }
  }, [userId]);
  return (
    <>
      {loading && <div>Loading</div>}

      {user && (
        <div className="card p-5 max-w-md mx-auto">
          {user.image === "f" && (
            <img
              src="https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-vector-id1209654046?k=20&m=1209654046&s=612x612&w=0&h=Atw7VdjWG8KgyST8AXXJdmBkzn0lvgqyWod9vTb2XoE="
              alt="userimg"
              className="max-h-32 items-center mx-auto"
            />
          )}
          <h1 className="text-2xl">Name: {user.name}</h1>
          <h1 className="text-2xl">Email: {user.email}</h1>
          <button className="primary-button my-2 w-full">My Orders</button>
        </div>
      )}
    </>
  );
}
