import React from "react";
import styles from "./styles.module.css"
import CategoryTreeBranch from "../CategoryTreeBranch";

export default function CategoryTree({treeData}) {

    return (
        Object.keys(treeData).map((branch) => {
            return (
                <CategoryTreeBranch
                    categoryTitle={branch.toString()}
                    images={treeData[branch]}
                    key={branch.toString()}
                />
            )
        })
    )
}