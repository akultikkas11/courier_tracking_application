import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getTrackingDetails } from "../services/trackingService";

export default function TrackingPage() {
  const { trackingId } = useParams();

  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTrackingDetails() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getTrackingDetails(trackingId);

        if (isMounted) {
          setTrackingData(data);
        }
      } 
      catch (err) {
        if (!isMounted) return;

        const message =
          err.response?.data?.detail ||
          "Unable to load tracking details. Please try again.";

        setError(message);
        setTrackingData(null);
      } 
      finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (trackingId) {
      loadTrackingDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [trackingId]);

  const details = trackingData
    ? [
        {
          label: "Sender",
          value: trackingData.sender_name,
        },
        {
          label: "Sender phone",
          value: trackingData.sender_phone_no,
        },
        {
          label: "Sender email",
          value: trackingData.sender_email,
        },
        {
          label: "Receiver",
          value: trackingData.receiver_name,
        },
        {
          label: "Receiver phone",
          value: trackingData.receiver_phone,
        },
        {
          label: "Route",
          value: `${trackingData.source_city} to ${trackingData.destination_city}`,
        },
        {
          label: "Weight",
          value: `${trackingData.weight_kg} kg`,
        },
      ]
    : [];

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      px-4
      py-8
      "
    >
      <main
        className="
        mx-auto
        w-full
        max-w-5xl
        "
      >
        <Link
          to="/"
          className="
          inline-flex
          mb-6
          text-sm
          font-medium
          text-slate-600
          hover:text-slate-950
          "
        >
          Back to search
        </Link>

        {isLoading && (
          <section
            className="
            rounded-lg
            bg-white
            p-8
            text-center
            shadow-sm
            "
          >
            <p className="text-slate-600">
              Loading tracking details...
            </p>
          </section>
        )}

        {!isLoading && error && (
          <section
            className="
            rounded-lg
            bg-white
            p-8
            text-center
            shadow-sm
            "
          >
            <p
              className="
              mb-2
              text-lg
              font-semibold
              text-slate-950
              "
            >
              Tracking details not found
            </p>
            <p className="text-slate-600">
              {error}
            </p>
          </section>
        )}

        {!isLoading && trackingData && (
          <div className="space-y-6">
            <section
              className="
              rounded-lg
              bg-white
              p-6
              shadow-sm
              "
            >
              <div
                className="
                flex
                flex-col
                gap-4
                border-b
                border-slate-200
                pb-5
                sm:flex-row
                sm:items-start
                sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                    text-sm
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500
                    "
                  >
                    Tracking ID
                  </p>
                  <h1
                    className="
                    mt-1
                    text-3xl
                    font-bold
                    text-slate-950
                    "
                  >
                    {trackingData.tracking_id}
                  </h1>
                </div>

                <span
                  className="
                  inline-flex
                  w-fit
                  rounded-full
                  bg-emerald-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-emerald-800
                  "
                >
                  {trackingData.current_status}
                </span>
              </div>

              <dl
                className="
                mt-6
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                "
              >
                {details.map((item) => (
                  <div key={item.label}>
                    <dt
                      className="
                      text-sm
                      font-medium
                      text-slate-500
                      "
                    >
                      {item.label}
                    </dt>
                    <dd
                      className="
                      mt-1
                      text-base
                      font-semibold
                      text-slate-950
                      "
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              className="
              rounded-lg
              bg-white
              p-6
              shadow-sm
              "
            >
              <h2
                className="
                mb-5
                text-xl
                font-bold
                text-slate-950
                "
              >
                Tracking History
              </h2>

              {trackingData.history.length === 0 ? (
                <p className="text-slate-600">
                  No tracking updates yet.
                </p>
              ) : (
                <ol className="space-y-5">
                  {trackingData.history.map(
                    (event, index) => (
                      <li
                        key={`${event.status}-${event.location}-${index}`}
                        className="relative pl-5"
                      >
                        {/* Vertical line */}
                        {index !== trackingData.history.length - 1 && (
                          <div
                            className={`
                              absolute
                              left-0
                              top-5
                              w-0.5
                              h-full
                              ${
                                index < trackingData.history.length - 1
                                  ? "bg-emerald-500"
                                  : "bg-slate-200"
                              }
                            `}
                          />
                        )}

                        {/* Status dot */}
                        <span
                          className={`
                            absolute
                            -left-2
                            top-1
                            h-4
                            w-4
                            rounded-full
                            ring-4
                            ring-white
                            ${
                              index === trackingData.history.length - 1
                                ? "bg-blue-500"
                                : "bg-emerald-500"
                            }
                          `}
                        />

                        <p className="font-semibold text-slate-950">
                          {event.status}
                        </p>

                        <p className="text-sm text-slate-600">
                          {event.location}
                        </p>

                        {event.remarks && (
                          <p className="mt-1 text-sm text-slate-500">
                            {event.remarks}
                          </p>
                        )}
                      </li>
                    )
                  )}
                </ol>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
