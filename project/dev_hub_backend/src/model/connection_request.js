import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is not a valid status`,
        },
    }
}, {
    timestamps: true
});

// index:
// connectionRequestSchema.index({ fromUserId: 1 });

// conpound index:
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
/**
 * index makes the query faster.
 * we can also use -1 for descending order.
 * 
 * use index when we have a large collection and we are frequently querying based on that field.
 * 
 * if we use unique. it will automatically create an index for that field as well as it will ensure that the value is unique in the collection.
 * 
 * creating to much index will make the write operation slower because it has to update the index as well. it causes reduced write performance (slower inserts/updates). so we should create index only on the fields which are frequently used in the query and we should avoid creating index on the fields which are frequently updated.
 */

connectionRequestSchema.pre("save", async function (next) {

    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You can't send connection request to yourself!");
    }

    next();
});

export const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);