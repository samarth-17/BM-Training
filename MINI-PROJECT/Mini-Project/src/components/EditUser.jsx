import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchUserById, updateUser } from "../api/UserApi";
import { toast } from "react-hot-toast";


export function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      role: "user",
      image: ""
    }
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserById(userId);
        setUser(userData); 
        Object.keys(userData).forEach((key) => setValue(key, userData[key]));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateUser(userId, data);
      setUser(updatedUser);
      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate(`/user/${userId}`);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>First Name</label>
          <input {...register("firstName", { required: "First name is required" })} className="border p-2 w-full" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Last Name</label>
          <input {...register("lastName", { required: "Last name is required" })} className="border p-2 w-full" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email", { required: "Email is required" })} className="border p-2 w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label>Username</label>
          <input {...register("username", { required: "Username is required" })} className="border p-2 w-full" />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label>Role</label>
          <select {...register("role")} className="border p-2 w-full">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        <div>
          <label>Profile Image URL</label>
          <input {...register("image")} className="border p-2 w-full" />
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate(`/user/${userId}`)} className="border p-2">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white p-2">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
