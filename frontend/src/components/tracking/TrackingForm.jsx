import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./TrackingForm.module.css";

export default function TrackingForm() {
  const [trackingId, setTrackingId] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trackingId.trim()) return;

    navigate(`/track/${trackingId.trim()}`);
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>
        Courier Tracking application
      </h1>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <label className={styles.label}>
          Tracking ID
        </label>

        <input
          type="text"
          value={trackingId}
          onChange={(e) =>
            setTrackingId(
              e.target.value
            )
          }
          placeholder="QS1001"
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.button}
        >
          Track Package
        </button>
      </form>
    </div>
  );
}
