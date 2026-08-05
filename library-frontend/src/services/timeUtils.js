export const formatTime = (dateTime) => {

    const date = new Date(dateTime);

    const now = new Date();

    const diff = Math.floor(
        (now - date) / 1000
    );

    if (diff < 60) {

        return "Just now";

    }

    if (diff < 3600) {

        return `${Math.floor(diff / 60)} min ago`;

    }

    if (diff < 86400) {

        return `${Math.floor(diff / 3600)} hr ago`;

    }

    if (diff < 172800) {

        return "Yesterday";

    }

    return date.toLocaleDateString();

};